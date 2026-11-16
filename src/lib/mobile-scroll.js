const mobileLayout = '(max-width: 900px), (max-width: 1024px) and (pointer: coarse)'

// Track the stationary frame, never the layer being transformed.
const mobileTracks = [
  ['.hero', .85, .05, 1],
  ['[data-scroll-scene="exit"]', .95, .32],
  ['[data-scroll-scene="outro"]', .94, .43],
]

// The same composition reads as a wider sequence on desktop and a shorter
// sequence on phones. Each tuple gives start, finish, and frame anchor.
const campaignTracks = [
  ['.director-stage', [.98, .24, .32], [.98, .32, .24]],
  ['.campaign-cut', [.99, .20, .40], [.95, .52, .50]],
  ['[data-scroll-scene="best"] .section-heading', [.96, .42], [.99, .36]],
  ['[data-scroll-scene="best"] .product-card', [.99, .36], [1, .35]],
]

export function getScrollWindow(track, viewport) {
  const visibleHeight = Math.max(1, viewport.height - viewport.header)
  const origin = track.top + track.height * track.anchor - viewport.header
  const start = origin - track.from * visibleHeight
  const end = origin - track.to * visibleHeight
  return { start, end, distance: end - start }
}

export function getScrollWindowProgress(bounds, scrollTop) {
  return Math.min(1, Math.max(0, (scrollTop - bounds.start) / bounds.distance))
}

export function getMobileScrollProgress(track, viewport, scrollTop) {
  return getScrollWindowProgress(getScrollWindow(track, viewport), scrollTop)
}

export function connectHomeScroll(hero) {
  const root = hero.closest('.route-view')
  if (!root || !window.ResizeObserver || !window.requestAnimationFrame || !window.matchMedia) return

  const mobile = window.matchMedia(mobileLayout)
  const nativeCut = window.CSS?.supports('animation-timeline', 'view()') &&
    window.CSS.supports('view-timeline-name', '--nova-mobile-cut') &&
    window.CSS.supports('animation-range', 'entry 72% cover 43%')
  const motion = window.matchMedia('(prefers-reduced-motion: no-preference)')
  if (!mobile.addEventListener || !motion.addEventListener) return

  const header = document.querySelector('.site-header')
  const ruler = document.createElement('div')
  ruler.className = 'mobile-scroll-viewport'
  ruler.setAttribute('aria-hidden', 'true')
  let tracks = []
  let usingMobile

  function measureTargets(specs, property) {
    return specs.flatMap(([selector, from, to, anchor = 0]) =>
      [...root.querySelectorAll(selector)].map(element => ({ element, from, to, anchor, property })),
    )
  }

  let frame = 0
  let needsMeasure = true
  let viewport
  const observer = new ResizeObserver(invalidate)

  function render() {
    frame = 0
    const scrollTop = window.scrollY
    const measure = needsMeasure
    if (measure) {
      viewport = {
        height: ruler.offsetHeight,
        header: header?.getBoundingClientRect().height ?? 0,
      }
      for (const track of tracks) {
        const rect = track.element.getBoundingClientRect()
        track.bounds = getScrollWindow({
          ...track,
          top: rect.top + scrollTop,
          height: rect.height,
        }, viewport)
      }
      needsMeasure = false
    }

    if (measure) root.style.setProperty('--nova-mobile-header', `${viewport.header}px`)
    for (const track of tracks) {
      const { start, end } = track.bounds
      if ((track.progress === 0 && scrollTop <= start) || (track.progress === 1 && scrollTop >= end)) continue
      const progress = Math.round(getScrollWindowProgress(track.bounds, scrollTop) * 1000) / 1000
      if (track.progress === progress) continue
      track.progress = progress
      track.element.style.setProperty(track.property, progress)
    }
  }

  function schedule() {
    if (!frame) frame = window.requestAnimationFrame(render)
  }

  function invalidate() {
    needsMeasure = true
    schedule()
  }

  function stop() {
    if (!root.hasAttribute('data-campaign-motion')) return
    observer.disconnect()
    window.removeEventListener('scroll', schedule)
    window.cancelAnimationFrame(frame)
    frame = 0
    root.removeAttribute('data-mobile-scroll')
    root.removeAttribute('data-campaign-motion')
    root.style.removeProperty('--nova-mobile-header')
    ruler.remove()
    for (const track of tracks) {
      track.element.style.removeProperty(track.property)
    }
  }

  function sync() {
    if (!motion.matches) {
      stop()
      return
    }
    if (root.hasAttribute('data-campaign-motion') && usingMobile === mobile.matches) return
    stop()
    usingMobile = mobile.matches
    const campaignSpecs = campaignTracks
      .filter(([selector]) => !(usingMobile && nativeCut && selector === '.campaign-cut'))
      .map(([selector, desktop, phone]) => [selector, ...(usingMobile ? phone : desktop)])
    tracks = measureTargets(campaignSpecs, '--nova-campaign-progress')
    if (usingMobile) tracks.push(...measureTargets(mobileTracks, '--nova-mobile-progress'))
    root.append(ruler)
    root.setAttribute('data-campaign-motion', '')
    root.toggleAttribute('data-mobile-scroll', usingMobile)
    needsMeasure = true
    render()
    observer.observe(ruler)
    observer.observe(root)
    if (header) observer.observe(header)
    for (const track of tracks) observer.observe(track.element)
    window.addEventListener('scroll', schedule, { passive: true })
  }

  mobile.addEventListener('change', sync)
  motion.addEventListener('change', sync)
  sync()

  return () => {
    stop()
    mobile.removeEventListener('change', sync)
    motion.removeEventListener('change', sync)
  }
}
