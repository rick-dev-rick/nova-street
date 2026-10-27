export function getRelatedProducts(catalog, product) {
  const candidates = catalog.filter(item => item.id !== product.id)
  return [
    ...candidates.filter(item => item.category === product.category),
    ...candidates.filter(item => item.category !== product.category),
  ].slice(0, 4)
}
