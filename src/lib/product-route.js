let moduleRequest
let ProductPage
let watcher

export function loadProductPage() {
  moduleRequest ??= import('../pages/Product.jsx').then(module => {
    ProductPage = module.default
    watcher?.stop()
    return module
  }, error => {
    moduleRequest = undefined
    throw error
  })
  return moduleRequest
}

export function getProductPage() { return ProductPage }

export function warmProductPage() {
  void loadProductPage().catch(() => {})
}

function createWatcher() {
  const targets = new Set()
  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting && targets.has(entry.target))) return
    stop()
    warmProductPage()
  }, { rootMargin: '240px' })

  function stop() {
    observer.disconnect()
    targets.clear()
    if (watcher?.observer === observer) watcher = undefined
  }

  return { targets, observer, stop }
}

export function observeProductLink(element) {
  if (!element || ProductPage || moduleRequest || !window.IntersectionObserver) return
  const current = watcher ??= createWatcher()
  current.targets.add(element)
  current.observer.observe(element)
  return () => {
    if (!current.targets.delete(element)) return
    if (current.targets.size) current.observer.unobserve(element)
    else current.stop()
  }
}
