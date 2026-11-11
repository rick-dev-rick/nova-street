import { ActionLink } from '../design-system/Action.jsx'
import EmptyState from '../components/EmptyState.jsx'
import HeartIcon from '../design-system/HeartIcon.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { products } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Favorites() {
  const { favorites } = useFavorites()
  const saved = products.filter(product => favorites.includes(product.id))

  return <section className="section container favorites-page">
    <div className="section-heading"><div className="catalog-intro"><p className="eyebrow">SUA SELEÇÃO</p><h1>Peças que são a sua cara.</h1><p>Seus favoritos ficam salvos neste navegador.</p></div>{saved.length > 0 && <ActionLink variant="text" to="/catalogo">Explorar coleção →</ActionLink>}</div>
    <p className="catalog-count" role="status">{saved.length} {saved.length === 1 ? 'peça salva' : 'peças salvas'}</p>
    {saved.length ? <div className="product-grid">{saved.map(product => <ProductCard headingLevel={2} key={product.id} product={product} />)}</div> : (
      <EmptyState
        headingLevel={2}
        title="Você ainda não tem favoritos."
        description="Toque no coração de uma peça para encontrá-la aqui depois."
        icon={<HeartIcon size={48} />}
        action={<ActionLink variant="primary" to="/catalogo">Explorar coleção</ActionLink>}
      />
    )}
  </section>
}
