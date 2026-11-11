import { Button } from '../design-system/Action.jsx'
import { normalizeQuantity } from '../lib/cart.js'

export function QuantityControls({ value, onChange, label, editable = false }) {
  return (
    <div className="quantity-controls" role="group" aria-label={label}>
      <Button variant="plain" aria-label={`Diminuir ${label.replace(/^Quantidade/, 'quantidade')}`} disabled={value <= 1} onClick={() => onChange(value - 1)}>−</Button>
      {editable
        ? <input aria-label={label} type="number" min="1" max="99" value={value} onChange={event => onChange(normalizeQuantity(event.target.value))} />
        : <span aria-live="polite" aria-atomic="true">{value}</span>}
      <Button variant="plain" aria-label={`Aumentar ${label.replace(/^Quantidade/, 'quantidade')}`} disabled={value >= 99} onClick={() => onChange(value + 1)}>+</Button>
    </div>
  )
}

export default function QuantitySelector({ value, onChange }) {
  return (
    <div className="product-quantity">
      <span>Quantidade</span>
      <QuantityControls value={value} onChange={onChange} label="Quantidade do produto" editable />
    </div>
  )
}
