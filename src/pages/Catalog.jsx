import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { categories, products } from '../data/products.js'
import { catalogOrders, selectProducts } from '../lib/catalog.js'

export default function Catalog() {
  const [params, setParams] = useSearchParams()
  const initial = params.get('categoria') || 'Todos'
  const category = categories.includes(initial) ? initial : 'Todos'
  const [query, setQuery] = useState('')

  const requestedOrder = params.get('ordem')
  const order = catalogOrders.some(item => item.value === requestedOrder) ? requestedOrder : 'destaques'
  const filtered = useMemo(() => selectProducts(products, { category, query, order }), [category, query, order])

  function updateParameter(key, value) {
    setParams(current => {
      const next = new URLSearchParams(current)
      if (value) next.set(key, value)
      else next.delete(key)
      return next
    })
  }

  function chooseCategory(next) {
    updateParameter('categoria', next === 'Todos' ? null : next)
  }

  return (
    <section className="section container catalog-page">
      <div className="catalog-intro"><p className="eyebrow dark">CATÁLOGO</p><h1>Coleção NØVA STREET</h1><p>Streetwear unissex, peças essenciais e drops selecionados.</p></div>
      <div className="catalog-tools">
        <div className="filter-row" aria-label="Filtrar por categoria">
          {categories.map((item) => <button type="button" className={item === category ? 'filter active' : 'filter'} aria-pressed={item === category} onClick={() => chooseCategory(item)} key={item}>{item}</button>)}
        </div>
        <div className="catalog-fields">
          <label className="search-field"><span>Buscar</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Nome do produto" /></label>
          <label className="sort-field"><span>Ordenar por</span><select value={order} onChange={(e) => updateParameter('ordem', e.target.value === 'destaques' ? null : e.target.value)}>{catalogOrders.map(item => <option value={item.value} key={item.value}>{item.label}</option>)}</select></label>
        </div>
      </div>
      <p className="catalog-count" role="status">{filtered.length} {filtered.length === 1 ? 'peça encontrada' : 'peças encontradas'}</p>
      {filtered.length ? <div className="product-grid">{filtered.map((product) => <ProductCard product={product} key={product.id} />)}</div> : <div className="empty-state"><h2>Nenhum produto encontrado.</h2><p>Tente outra categoria ou termo de busca.</p></div>}
    </section>
  )
}
