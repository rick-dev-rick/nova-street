import { normalizeQuantity } from '../lib/cart.js'

export default function QuantitySelector({ value, onChange }) {
  return <div className="product-quantity" role="group" aria-label="Quantidade do produto"><span>Quantidade</span><span className="quantity-controls">
    <button type="button" aria-label="Diminuir quantidade" disabled={value <= 1} onClick={() => onChange(value - 1)}>−</button>
    <input aria-label="Quantidade do produto" type="number" min="1" max="99" value={value} onChange={event => onChange(normalizeQuantity(event.target.value))} />
    <button type="button" aria-label="Aumentar quantidade" disabled={value >= 99} onClick={() => onChange(value + 1)}>+</button>
  </span></div>
}
