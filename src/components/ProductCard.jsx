import { Link } from 'react-router-dom'
import FavoriteButton from './FavoriteButton.jsx'
import '../styles/premium-product-card.css'

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

function endTouchPress(event) {
  event.currentTarget.removeAttribute('data-touch-pressed')
}

const touchFeedback = {
  onPointerDown(event) {
    if (event.isPrimary && (event.pointerType === 'touch' || event.pointerType === 'pen')) {
      event.currentTarget.setAttribute('data-touch-pressed', '')
    }
  },
  onPointerUp: endTouchPress,
  onPointerCancel: endTouchPress,
  onLostPointerCapture: endTouchPress,
}

export default function ProductCard({ product, headingLevel = 3 }) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <article className="product-card">
      <div className="product-card-visual">
        <Link to={`/produto/${product.id}`} className="product-image-wrap" {...touchFeedback}>
          <span className="product-image-plane">
            <img src={product.image} alt={product.name} loading="lazy" />
          </span>
          <span className="product-image-cue" aria-hidden="true" />
          {product.badge && <span className="product-badge">{product.badge}</span>}
        </Link>
        <FavoriteButton product={product} />
      </div>
      <div className="product-meta">
        <p>{product.category}</p>
        <Heading className="product-card-title"><Link to={`/produto/${product.id}`} {...touchFeedback}>{product.name}</Link></Heading>
        <strong className="price">{money.format(product.price)}</strong>
      </div>
    </article>
  )
}
