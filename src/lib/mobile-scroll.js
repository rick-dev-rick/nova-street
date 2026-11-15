const mobileLayout = '(max-width: 900px), (max-width: 1024px) and (pointer: coarse)'
const progressProperty = '--nova-mobile-progress'

// Track the stationary frame, never the layer being transformed.
const sceneTracks = [
  ['.hero', .85, .05, 1],
  ['[data-scroll-scene="exit"]', .95, .32],
  ['[data-scroll-scene="explore"] .section-heading', .94, .45],
  ['[data-scroll-scene="explore"] .category-card', .96, .32],
  ['[data-scroll-scene="new"] .product-card', .96, .35],
  ['.director-stage', .96, .34, .18],
  ['[data-scroll-scene="best"]', .98, .28],
  ['[data-scroll-scene="best"] .product-card', .99, .47],
  ['[data-scroll-scene="lifestyle"] .lifestyle-card', 1, .06, .34],
  ['[data-scroll-scene="outro"]', .94, .43],
]

export function getMobileScrollProgress(track, viewport, scrollTop) {
  const visibleHeight = Math.max(1, viewport.height - viewport.header)
  const position = track.top + track.height * track.anchor - scrollTop - viewport.header
  return Math.min(1, Math.max(0, (track.from - position / visibleHeight) / (track.from - track.to)))
}

export function connectMobileScroll(hero) {
  const root = hero.closest('.route-view')
  if (!root || !window.ResizeObserver || !window.requestAnimationFrame || !window.matchMedia) return

  const mobile = window.matchMedia(mobileLayout)
  const motion = window.matchMedia('(prefers-reduced-motion: no-preference)')
  if (!mobile.addEventListener || !motion.addEventListener) return

  const header = document.querySelector('.site-header')
  const ruler = document.createElement('div')
  ruler.className = 'mobile-scroll-viewport'
  ruler.setAttribute('aria-hidden', 'true')
  const tracks = sceneTracks.flatMap(([selector, from, to, anchor = 0]) =>
    [...root.querySelectorAll(selector)].map(element => ({ element, from, to, anchor })),
  )

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
        track.top = rect.top + scrollTop
        track.height = rect.height
      }
      needsMeasure = false
    }

    if (measure) root.style.setProperty('--nova-mobile-header', `${viewport.header}px`)
    for (const track of tracks) {
      const progress = Math.round(getMobileScrollProgress(track, viewport, scrollTop) * 1000) / 1000
      if (track.progress === progress) continue
      track.progress = progress
      track.element.style.setProperty(progressProperty, progress)
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
    if (!root.hasAttribute('data-mobile-scroll')) return
    observer.disconnect()
    window.removeEventListener('scroll', schedule)
    window.cancelAnimationFrame(frame)
    frame = 0
    root.removeAttribute('data-mobile-scroll')
    root.style.removeProperty('--nova-mobile-header')
    ruler.remove()
    for (const track of tracks) {
      track.element.style.removeProperty(progressProperty)
      track.progress = undefined
    }
  }

  function sync() {
    if (!mobile.matches || !motion.matches) {
      stop()
      return
    }
    if (root.hasAttribute('data-mobile-scroll')) return
    root.append(ruler)
    root.setAttribute('data-mobile-scroll', '')
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
