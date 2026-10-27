import { Link } from 'react-router-dom'
import FavoriteButton from './FavoriteButton.jsx'

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-card-visual">
      <Link to={`/produto/${product.id}`} className="product-image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.badge && <span className="product-badge">{product.badge}</span>}
      </Link>
      <FavoriteButton product={product} />
      </div>
      <div className="product-meta">
        <p>{product.category}</p>
        <h3><Link to={`/produto/${product.id}`}>{product.name}</Link></h3>
        <strong>{money.format(product.price)}</strong>
      </div>
    </article>
  )
}
