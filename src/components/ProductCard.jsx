import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { getProductPage, observeProductLink, warmProductPage } from '../lib/product-route.js'
import { startProductFlight } from '../lib/product-flight.js'
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

export default function ProductCard({ product, headingLevel = 3, revealKey }) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  const navigate = useNavigate()
  const frame = useRef(null)
  const to = `/produto/${product.id}`
  useEffect(() => observeProductLink(frame.current), [])

  function activate(event) {
    if (getProductPage()) startProductFlight(event, { frame: frame.current, to, navigate })
  }
  return (
    <article className="product-card" data-editorial-reveal={revealKey}>
      <div className="product-card-visual">
        <Link to={to} className="product-image-wrap" onClick={activate} onFocus={warmProductPage}
          onPointerEnter={warmProductPage} {...touchFeedback}>
          <span className="product-flight-frame" ref={frame}>
            <span className="product-image-plane">
              <img src={product.image} alt={product.name} loading="lazy" />
            </span>
          </span>
          <span className="product-image-cue" aria-hidden="true" />
          {product.badge && <span className="product-badge">{product.badge}</span>}
        </Link>
        <FavoriteButton product={product} />
      </div>
      <div className="product-meta">
        <p>{product.category}</p>
        <Heading className="product-card-title"><Link to={to} onClick={activate} onFocus={warmProductPage} {...touchFeedback}>{product.name}</Link></Heading>
        <strong className="price">{money.format(product.price)}</strong>
      </div>
    </article>
  )
}
