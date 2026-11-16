import { flushSync } from 'react-dom'
import { getProductPage } from './product-route.js'

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
  if (!isPlainProductActivation(event) || !document.startViewTransition || !getProductPage() ||
      !window.matchMedia('(prefers-reduced-motion: no-preference)').matches || !photoIsVisible(frame)) return

  active?.interrupt()
  const root = document.documentElement
  const request = { token: ++sequence, origin: window.location.href, source: frame }
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
    request.transition?.skipTransition()
    clean()
  }

  const controller = new AbortController()
  request.interrupt = interrupt
  frame.style.viewTransitionName = photoName
  root.setAttribute('data-product-flight', '')
  try {
    request.transition = document.startViewTransition(() => {
      if (active !== request || request.origin !== window.location.href) return
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
  window.addEventListener('popstate', interrupt, { signal: controller.signal })
  void request.transition.ready.catch(() => {})
  void request.transition.finished.then(clean, clean)
}
