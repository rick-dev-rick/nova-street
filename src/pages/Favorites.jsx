import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { products } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Favorites() {
  const { favorites } = useFavorites()
  const saved = products.filter(product => favorites.includes(product.id))

  return <section className="section container favorites-page">
    <div className="section-heading"><div className="catalog-intro"><p className="eyebrow dark">SUA SELEÇÃO</p><h1>Peças que são a sua cara.</h1><p>Seus favoritos ficam salvos neste navegador.</p></div><Link className="text-link" to="/catalogo">Explorar coleção →</Link></div>
    <p className="catalog-count" role="status">{saved.length} {saved.length === 1 ? 'peça salva' : 'peças salvas'}</p>
    {saved.length ? <div className="product-grid">{saved.map(product => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state favorites-empty"><span aria-hidden="true">♡</span><h2>Sua seleção começa com um coração.</h2><p>Toque no coração de uma peça para encontrá-la aqui depois.</p><Link className="btn btn-primary" to="/catalogo">Encontrar minhas favoritas</Link></div>}
  </section>
}
