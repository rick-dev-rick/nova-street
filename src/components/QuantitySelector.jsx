import { Button } from '../design-system/Action.jsx'
import { MAX_CART_QUANTITY, normalizeQuantity } from '../lib/cart.js'

export function QuantityControls({ value, onChange, label, editable = false, max = MAX_CART_QUANTITY, disabled = false }) {
  return (
    <div className="quantity-controls" role="group" aria-label={label}>
      <Button variant="plain" aria-label={`Diminuir ${label.replace(/^Quantidade/, 'quantidade')}`} disabled={disabled || value <= 1} onClick={() => onChange(value - 1)}>−</Button>
      {editable
        ? <input aria-label={label} type="number" min="1" max={max} disabled={disabled} value={value} onChange={event => onChange(Math.min(max, normalizeQuantity(event.target.value)))} />
        : <span aria-live="polite" aria-atomic="true">{value}</span>}
      <Button variant="plain" aria-label={`Aumentar ${label.replace(/^Quantidade/, 'quantidade')}`} disabled={disabled || value >= max} onClick={() => onChange(value + 1)}>+</Button>
    </div>
  )
}

export default function QuantitySelector({ value, onChange, max, disabled }) {
  return (
    <div className="product-quantity">
      <span>Quantidade</span>
      <QuantityControls value={value} onChange={onChange} label="Quantidade do produto" max={max} disabled={disabled} editable />
    </div>
  )
}
