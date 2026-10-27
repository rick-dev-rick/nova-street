import { useId, useState } from 'react'
import { getShippingQuote } from '../lib/shipping.js'

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export default function ShippingCalculator({ subtotal, cep, onCepChange }) {
  const id = useId()
  const [draft, setDraft] = useState(cep)
  const [attempted, setAttempted] = useState(false)
  const quote = getShippingQuote(cep, subtotal)
  const invalid = attempted && !getShippingQuote(draft, subtotal)

  function calculate(event) {
    event.preventDefault()
    setAttempted(true)
    const next = getShippingQuote(draft, subtotal)
    onCepChange(next ? next.cep : '')
  }

  return <form className="shipping-calculator" onSubmit={calculate} noValidate>
    <label htmlFor={id}>Simular frete por CEP</label>
    <div className="shipping-input-row"><input id={id} inputMode="numeric" autoComplete="postal-code" maxLength={9} placeholder="00000-000" value={draft} aria-invalid={invalid} aria-describedby={`${id}-help${invalid ? ` ${id}-error` : ''}`} onChange={event => { setDraft(event.target.value); setAttempted(false); onCepChange('') }} /><button type="submit">Calcular</button></div>
    {invalid && <p id={`${id}-error`} className="shipping-error" role="alert">Informe um CEP com 8 números, sem repetir o mesmo número.</p>}
    {quote && <p className="shipping-result" role="status">CEP {quote.cep.slice(0, 5)}-{quote.cep.slice(5)} · {quote.cost === 0 ? 'Frete grátis' : money.format(quote.cost)}<br />Prazo ilustrativo: {quote.estimatedDays}.</p>}
    <p id={`${id}-help`} className="shipping-help">Simulação local: CEP sem consulta. Frete fictício de R$ 19,90, grátis a partir de R$ 299. Nenhuma entrega real.</p>
  </form>
}
