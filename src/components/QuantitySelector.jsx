import { Button } from '../design-system/Action.jsx'
import { useState } from 'react'
import { MAX_CART_QUANTITY, readQuantityInput } from '../lib/cart.js'

export function QuantityInput({ value, onChange, label, max = MAX_CART_QUANTITY, disabled = false }) {
  const [emptyDraft, setEmptyDraft] = useState(false)

  function edit(event) {
    const next = readQuantityInput(event.currentTarget.valueAsNumber, max)
    setEmptyDraft(next === null)
    if (next !== null && next !== value) onChange(next)
  }

  return (
    <input
      aria-label={label}
      type="number"
      inputMode="numeric"
      min="1"
      max={max}
      disabled={disabled}
      value={emptyDraft ? '' : value}
      onChange={edit}
      onBlur={() => setEmptyDraft(false)}
      onKeyDown={event => { if (event.key === 'Enter') setEmptyDraft(false) }}
    />
  )
}

export function QuantityControls({ value, onChange, label, editable = false, max = MAX_CART_QUANTITY, disabled = false }) {
  return (
    <div className="quantity-controls" role="group" aria-label={label}>
      <Button variant="plain" aria-label={`Diminuir ${label.replace(/^Quantidade/, 'quantidade')}`} disabled={disabled || value <= 1} onClick={() => onChange(value - 1)}>−</Button>
      {editable
        ? <QuantityInput label={label} value={value} onChange={onChange} max={max} disabled={disabled} />
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
