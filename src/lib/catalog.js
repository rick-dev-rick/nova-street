export const catalogOrders = [
  { value: 'destaques', label: 'Destaques' },
  { value: 'menor-preco', label: 'Menor preço' },
  { value: 'maior-preco', label: 'Maior preço' },
  { value: 'novidades', label: 'Novidades' },
]

export function selectProducts(products, { category = 'Todos', query = '', order = 'destaques' } = {}) {
  const term = query.trim().toLocaleLowerCase('pt-BR')
  const selected = products.filter(product =>
    (category === 'Todos' || product.category === category) &&
    product.name.toLocaleLowerCase('pt-BR').includes(term),
  )
  if (order === 'menor-preco') return selected.sort((a, b) => a.price - b.price)
  if (order === 'maior-preco') return selected.sort((a, b) => b.price - a.price)
  if (order === 'novidades') return selected.sort((a, b) => (b.releasedAt ?? '').localeCompare(a.releasedAt ?? ''))
  return selected
}
