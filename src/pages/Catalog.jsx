import { InputField, SelectField } from '../design-system/Field.jsx'
import ChoiceButton from '../design-system/ChoiceButton.jsx'
import { Button } from '../design-system/Action.jsx'
import { useMemo, useRef } from 'react'
import { useNavigationType, useSearchParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { categories, products } from '../data/products.js'
import { catalogOrders, parseCatalogParams, selectProducts, updateCatalogParams } from '../lib/catalog.js'

export default function Catalog() {
  const [params, setParams] = useSearchParams()
  const navigationType = useNavigationType()
  const editingQuery = useRef(false)
  const resultsStatus = useRef(null)
  const { category, query, order } = parseCatalogParams(params, categories)

  const filtered = useMemo(() => selectProducts(products, { category, query, order }), [category, query, order])
  const hasFilters = category !== 'Todos' || query !== '' || order !== 'destaques'

  function changeFilters(updates) {
    editingQuery.current = false
    const next = updateCatalogParams(params, updates)
    if (next.toString() !== params.toString()) setParams(next)
  }

  function changeQuery(event) {
    const next = updateCatalogParams(params, { query: event.target.value })
    const replace = editingQuery.current && navigationType !== 'POP'
    editingQuery.current = true
    setParams(next, { replace })
  }

  function clearFilters() {
    changeFilters({ category: 'Todos', order: 'destaques', query: '' })
    resultsStatus.current.focus()
  }

  return (
    <section className="section container catalog-page">
      <div className="catalog-intro"><p className="eyebrow">CATÁLOGO</p><h1>Coleção NØVA STREET</h1><p>Streetwear unissex, peças essenciais e drops selecionados.</p></div>
      <div className="catalog-tools" role="group" aria-label="Controles do catálogo">
        <div className="filter-row" role="group" aria-label="Filtrar por categoria">
          {categories.map((item) => <ChoiceButton className="filter" selected={item === category} onClick={() => changeFilters({ category: item })} key={item}>{item}</ChoiceButton>)}
        </div>
        <div className="catalog-fields">
          <InputField
            type="search"
            className="search-field"
            label="Buscar"
            value={query}
            onChange={changeQuery}
            onBlur={() => { editingQuery.current = false }}
            placeholder="Nome ou termo"
          />
          <SelectField className="sort-field" label="Ordenar por" value={order} onChange={(event) => changeFilters({ order: event.target.value })}>{catalogOrders.map(item => <option value={item.value} key={item.value}>{item.label}</option>)}</SelectField>
        </div>
        {hasFilters && filtered.length > 0 && <Button variant="secondary" onClick={clearFilters}>Limpar filtros</Button>}
      </div>
      <p ref={resultsStatus} className="catalog-count" role="status" tabIndex={-1}>{filtered.length} {filtered.length === 1 ? 'peça encontrada' : 'peças encontradas'}</p>
      {filtered.length ? <div className="product-grid">{filtered.map((product) => <ProductCard headingLevel={2} product={product} key={product.id} />)}</div> : (
        <EmptyState
          headingLevel={2}
          title="Nenhum produto encontrado."
          description="Altere o termo ou limpe os filtros para ver outras peças."
          action={<Button variant="primary" onClick={clearFilters}>Limpar filtros</Button>}
        />
      )}
    </section>
  )
}
