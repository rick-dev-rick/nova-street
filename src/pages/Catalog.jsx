import { useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { categories, products } from '../data/products.js'
import { catalogOrders, selectProducts } from '../lib/catalog.js'

export default function Catalog() {
  const [params, setParams] = useSearchParams()
  const initial = params.get('categoria') || 'Todos'
  const category = categories.includes(initial) ? initial : 'Todos'
  const [query, setQuery] = useState('')
  const resultsStatus = useRef(null)

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

  function clearFilters() {
    setQuery('')
    chooseCategory('Todos')
    resultsStatus.current.focus()
  }

  return (
    <section className="section container catalog-page">
      <div className="catalog-intro"><p className="eyebrow">CATÁLOGO</p><h1>Coleção NØVA STREET</h1><p>Streetwear unissex, peças essenciais e drops selecionados.</p></div>
      <div className="catalog-tools" role="group" aria-label="Controles do catálogo">
        <div className="filter-row" role="group" aria-label="Filtrar por categoria">
          {categories.map((item) => <button type="button" className={item === category ? 'filter active' : 'filter'} aria-pressed={item === category} onClick={() => chooseCategory(item)} key={item}>{item}</button>)}
        </div>
        <div className="catalog-fields">
          <label className="search-field"><span>Buscar</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Nome do produto" type="search" /></label>
          <label className="sort-field"><span>Ordenar por</span><select value={order} onChange={(e) => updateParameter('ordem', e.target.value === 'destaques' ? null : e.target.value)}>{catalogOrders.map(item => <option value={item.value} key={item.value}>{item.label}</option>)}</select></label>
        </div>
      </div>
      <p ref={resultsStatus} className="catalog-count" role="status" tabIndex={-1}>{filtered.length} {filtered.length === 1 ? 'peça encontrada' : 'peças encontradas'}</p>
      {filtered.length ? <div className="product-grid">{filtered.map((product) => <ProductCard headingLevel={2} product={product} key={product.id} />)}</div> : (
        <EmptyState
          headingLevel={2}
          title="Nenhum produto encontrado."
          description="Limpe a busca e a categoria para ver outras peças."
          action={<button type="button" className="btn btn-primary" onClick={clearFilters}>Limpar filtros</button>}
        />
      )}
    </section>
  )
}
