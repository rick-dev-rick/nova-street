import { InputField, SelectField } from '../design-system/Field.jsx'
import ChoiceButton from '../design-system/ChoiceButton.jsx'
import { Button } from '../design-system/Action.jsx'
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
          {categories.map((item) => <ChoiceButton className="filter" selected={item === category} onClick={() => chooseCategory(item)} key={item}>{item}</ChoiceButton>)}
        </div>
        <div className="catalog-fields">
          <InputField type="search" className="search-field" label="Buscar" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Nome do produto" />
          <SelectField className="sort-field" label="Ordenar por" value={order} onChange={(e) => updateParameter('ordem', e.target.value === 'destaques' ? null : e.target.value)}>{catalogOrders.map(item => <option value={item.value} key={item.value}>{item.label}</option>)}</SelectField>
        </div>
      </div>
      <p ref={resultsStatus} className="catalog-count" role="status" tabIndex={-1}>{filtered.length} {filtered.length === 1 ? 'peça encontrada' : 'peças encontradas'}</p>
      {filtered.length ? <div className="product-grid">{filtered.map((product) => <ProductCard headingLevel={2} product={product} key={product.id} />)}</div> : (
        <EmptyState
          headingLevel={2}
          title="Nenhum produto encontrado."
          description="Limpe a busca e a categoria para ver outras peças."
          action={<Button variant="primary" onClick={clearFilters}>Limpar filtros</Button>}
        />
      )}
    </section>
  )
}
