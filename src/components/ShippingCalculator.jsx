import Feedback from '../design-system/Feedback.jsx'
import { Button } from '../design-system/Action.jsx'
import { useId, useLayoutEffect, useRef, useState } from 'react'
import { DEMO_SHIPPING_CEP, formatShippingCep, getShippingQuote, normalizeShippingCep } from '../lib/shipping.js'

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export default function ShippingCalculator({ subtotal, cep, onCepChange }) {
  const id = useId()
  const field = useRef(null)
  const [draft, setDraft] = useState(() => cep ? formatShippingCep(cep) : '')
  const [attempts, setAttempts] = useState(0)
  const quote = getShippingQuote(cep, subtotal)
  const invalid = attempts > 0 && !normalizeShippingCep(draft)

  useLayoutEffect(() => {
    if (invalid) field.current.focus()
  }, [attempts, invalid])

  function calculate(value) {
    const next = normalizeShippingCep(value)
    setAttempts(attempt => attempt + 1)
    if (next) setDraft(formatShippingCep(next))
    onCepChange(next ?? '')
  }

  function changeDraft(event) {
    const value = event.target.value
    setDraft(value)
    setAttempts(0)
    if (cep && normalizeShippingCep(value) !== cep) onCepChange('')
  }

  return (
    <form className="shipping-calculator" noValidate onSubmit={event => {
      event.preventDefault()
      calculate(draft)
    }}>
      <label htmlFor={id}>Simular frete por CEP</label>
      <div className="shipping-input-row">
        <input
          ref={field} id={id} inputMode="numeric" enterKeyHint="go" autoComplete="off"
          placeholder="00000-000" value={draft} onChange={changeDraft}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? `${id}-error ${id}-help` : `${id}-help`}
        />
        <button type="submit">Calcular</button>
      </div>
      <Button className="shipping-example" variant="text" onClick={() => calculate(DEMO_SHIPPING_CEP)}>
        Usar CEP de exemplo
      </Button>
      {invalid && <Feedback id={`${id}-error`} className="shipping-error" tone="error">Informe um CEP com 8 números, sem repetir o mesmo número.</Feedback>}
      {quote && <Feedback className="shipping-result" tone="success">CEP {formatShippingCep(quote.cep)} · {quote.cost === 0 ? 'Frete grátis' : money.format(quote.cost)}<br />Prazo ilustrativo: {quote.estimatedDays}.</Feedback>}
      <p id={`${id}-help`} className="shipping-help">Simulação local: CEP sem consulta. Frete fictício de R$ 19,90, grátis a partir de R$ 299. Nenhuma entrega real.</p>
    </form>
  )
}
