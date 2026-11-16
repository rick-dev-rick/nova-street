let moduleRequest
let ProductPage
let observer

export function loadProductPage() {
  moduleRequest ??= import('../pages/Product.jsx').then(module => {
    ProductPage = module.default
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

export function observeProductLink(element) {
  if (!element || ProductPage || moduleRequest || !window.IntersectionObserver) return
  observer ??= new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return
    observer.disconnect()
    observer = undefined
    warmProductPage()
  }, { rootMargin: '240px' })
  const watcher = observer
  watcher.observe(element)
  return () => watcher.unobserve(element)
}
