const targetSelector = '[data-editorial-reveal]'
const storageKey = 'nova:editorial-reveal:v1'
const sessionCards = new WeakMap()

function getSeenCards(view) {
  if (sessionCards.has(view)) return sessionCards.get(view)

  let stored
  try {
    stored = JSON.parse(view.sessionStorage.getItem(storageKey))
  } catch {
    // A blocked or unavailable session store still allows one reveal per document.
  }

  const seen = new Set(Array.isArray(stored) ? stored : [])
  sessionCards.set(view, seen)
  return seen
}

export function connectEditorialReveal(root) {
  const view = root?.ownerDocument.defaultView
  if (!view?.IntersectionObserver || !view.matchMedia) return

  const seen = getSeenCards(view)
  const motion = view.matchMedia('(prefers-reduced-motion: reduce)')
  const pending = new Set([...root.querySelectorAll(targetSelector)]
    .filter(card => !seen.has(card.dataset.editorialReveal)))
  const entering = new Set()

  function persist() {
    try {
      view.sessionStorage.setItem(storageKey, JSON.stringify([...seen]))
    } catch {
      // Keep the in-memory session when storage is blocked.
    }
  }

  function reveal(card, animate) {
    if (!pending.delete(card)) return false
    observer.unobserve(card)
    seen.add(card.dataset.editorialReveal)
    if (animate && !motion.matches && !card.contains(root.ownerDocument.activeElement)) {
      entering.add(card)
      card.dataset.editorialEnter = ''
    }
    return true
  }

  const observer = new view.IntersectionObserver(entries => {
    let changed = false
    for (const { target, isIntersecting } of entries) {
      if (isIntersecting && reveal(target, true)) changed = true
    }
    if (changed) persist()
  })

  function finish(card) {
    if (entering.delete(card)) delete card.dataset.editorialEnter
  }

  function handleAnimationEnd(event) {
    if (event.animationName === 'editorial-card-enter') finish(event.target)
  }

  function handleFocus(event) {
    const card = event.target.closest(targetSelector)
    if (!card || !root.contains(card)) return
    if (reveal(card, false)) persist()
    finish(card)
  }

  function handleMotionChange() {
    if (motion.matches) entering.forEach(finish)
  }

  for (const card of pending) observer.observe(card)
  root.addEventListener('focusin', handleFocus)
  root.addEventListener('animationend', handleAnimationEnd)
  motion.addEventListener?.('change', handleMotionChange)

  return () => {
    observer.disconnect()
    pending.clear()
    entering.forEach(finish)
    root.removeEventListener('focusin', handleFocus)
    root.removeEventListener('animationend', handleAnimationEnd)
    motion.removeEventListener?.('change', handleMotionChange)
  }
}
