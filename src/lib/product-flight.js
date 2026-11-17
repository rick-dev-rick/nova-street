import { flushSync } from 'react-dom'

const photoName = 'nova-product-photo'
let active
let sequence = 0

export function isPlainProductActivation(event) {
  return event.button === 0 && !event.defaultPrevented &&
    !event.metaKey && !event.ctrlKey && !event.altKey && !event.shiftKey &&
    (!event.currentTarget.target || event.currentTarget.target === '_self')
}

export function isProductFlightArrival(token) {
  return active !== undefined && active.token === token
}

function photoIsVisible(frame) {
  const photo = frame?.querySelector('img')
  if (!photo?.complete || !photo.naturalWidth) return false
  const rect = frame.getBoundingClientRect()
  const headerBottom = document.querySelector('.site-header')?.getBoundingClientRect().bottom ?? 0
  const visibleHeight = Math.min(window.innerHeight, rect.bottom) - Math.max(headerBottom, rect.top)
  return rect.width > 0 && visibleHeight >= Math.min(rect.height / 3, 90)
}

export function startProductFlight(event, { frame, to, navigate }) {
  if (!isPlainProductActivation(event) || !document.startViewTransition ||
      !window.matchMedia('(prefers-reduced-motion: no-preference)').matches || !photoIsVisible(frame)) return

  const token = ++sequence
  active?.interrupt()
  const root = document.documentElement
  const request = {
    token,
    origin: window.location.href,
    historyKey: window.history.state?.key,
    source: frame,
  }
  active = request

  function clean() {
    if (controller.signal.aborted) return
    request.source.style.removeProperty('view-transition-name')
    request.destination?.style.removeProperty('view-transition-name')
    controller.abort()
    if (active === request) {
      active = undefined
      root.removeAttribute('data-product-flight')
    }
  }

  function interrupt() {
    clean()
    request.transition?.skipTransition()
  }

  const controller = new AbortController()
  request.interrupt = interrupt
  frame.style.viewTransitionName = photoName
  root.setAttribute('data-product-flight', '')
  try {
    request.transition = document.startViewTransition(() => {
      if (request.cancelNavigation || token !== sequence || request.origin !== window.location.href ||
          request.historyKey !== window.history.state?.key) return
      if (controller.signal.aborted) {
        navigate(to)
        return
      }
      flushSync(() => navigate(to, { state: { productFlight: request.token } }))
      window.scrollTo({ top: 0, behavior: 'instant' })
      request.destination = document.querySelector('[data-product-flight-target]')
      if (request.destination) request.destination.style.viewTransitionName = photoName
      else request.transition.skipTransition()
    })
  } catch {
    clean()
    return
  }

  event.preventDefault()
  for (const type of ['pointerdown', 'keydown', 'wheel']) {
    document.addEventListener(type, interrupt, { capture: true, passive: true, signal: controller.signal })
  }
  window.addEventListener('popstate', () => {
    request.cancelNavigation = true
    interrupt()
  }, { signal: controller.signal })
  void request.transition.ready.catch(() => {})
  void request.transition.finished.then(clean, clean)
}
