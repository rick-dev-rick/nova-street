export const catalogOrders = [
  { value: 'destaques', label: 'Destaques' },
  { value: 'menor-preco', label: 'Menor preço' },
  { value: 'maior-preco', label: 'Maior preço' },
  { value: 'novidades', label: 'Novidades' },
]

export function parseCatalogParams(params, categories) {
  const category = params.get('categoria')
  const order = params.get('ordem')
  return {
    category: categories.includes(category) ? category : 'Todos',
    query: params.get('busca') ?? '',
    order: catalogOrders.some(item => item.value === order) ? order : 'destaques',
  }
}

export function updateCatalogParams(params, { category, order, query }) {
  const next = new URLSearchParams(params)
  const updates = {
    categoria: category === 'Todos' ? '' : category,
    ordem: order === 'destaques' ? '' : order,
    busca: query,
  }
  for (const [name, value] of Object.entries(updates)) {
    if (value === undefined) continue
    if (value) next.set(name, value)
    else next.delete(name)
  }
  return next
}

function normalizeSearch(value) {
  return value.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/\p{M}/gu, '').replaceAll('ø', 'o')
}

export function selectProducts(products, { category = 'Todos', query = '', order = 'destaques' } = {}) {
  const terms = normalizeSearch(query).trim().split(/\s+/).filter(Boolean)
  const selected = products.filter(product => {
    if (category !== 'Todos' && product.category !== category) return false
    if (!terms.length) return true
    const searchable = normalizeSearch([product.name, product.category, product.description].join(' '))
    return terms.every(term => searchable.includes(term))
  })
  if (order === 'menor-preco') return selected.sort((a, b) => a.price - b.price)
  if (order === 'maior-preco') return selected.sort((a, b) => b.price - a.price)
  if (order === 'novidades') return selected.sort((a, b) => (b.releasedAt ?? '').localeCompare(a.releasedAt ?? ''))
  return selected
}
