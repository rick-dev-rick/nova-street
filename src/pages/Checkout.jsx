import { validateCheckout } from '../lib/checkout-validation.js'
import { InputField } from '../design-system/Field.jsx'
import Feedback from '../design-system/Feedback.jsx'
import { ActionLink, Button } from '../design-system/Action.jsx'
import { useEffect, useId, useRef, useState } from 'react'
import EmptyState from '../components/EmptyState.jsx'
import ShippingCalculator from '../components/ShippingCalculator.jsx'
import OrderTotals from '../components/OrderTotals.jsx'

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export default function Checkout({ cart, subtotal, shippingCep, onShippingCepChange, shippingQuote }) {
  const [confirmed, setConfirmed] = useState(null)
  const confirmationTitle = useRef(null)
  const [errors, setErrors] = useState({})
  const attempted = useRef(false)
  const invalidField = useRef(null)
  const cepId = useId()

  useEffect(() => {
    if (!invalidField.current) return
    invalidField.current.scrollIntoView({ block: 'center', behavior: 'instant' })
    invalidField.current.focus({ preventScroll: true })
    invalidField.current = null
  }, [errors])

  function readErrors(form) {
    return validateCheckout(
      Object.fromEntries(new FormData(form)),
      form.elements.namedItem('email').validity.typeMismatch,
    )
  }

  function submit(event) {
    event.preventDefault()
    if (!shippingQuote) return
    attempted.current = true
    const form = event.currentTarget
    const nextErrors = readErrors(form)
    const firstError = Object.keys(nextErrors)[0]
    if (firstError) invalidField.current = form.elements.namedItem(firstError)
    setErrors(nextErrors)
    if (!firstError) setConfirmed({ total: shippingQuote.total })
  }

  function focusShipping() {
    const field = document.getElementById(cepId)
    field.scrollIntoView({ block: 'center', behavior: 'instant' })
    field.focus({ preventScroll: true })
  }

  useEffect(() => {
    if (confirmed) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      confirmationTitle.current.focus({ preventScroll: true })
    }
  }, [confirmed])

  if (confirmed) return (
    <section className="section container checkout-confirmation">
      <p className="eyebrow">SIMULAÇÃO CONCLUÍDA</p>
      <h1 ref={confirmationTitle} tabIndex={-1}>Seu estilo está na sacola.</h1>
      <p>Pedido demonstrativo de {money.format(confirmed.total)}, incluindo frete simulado. Nenhuma compra foi realizada e seus dados não foram enviados.</p>
      <ActionLink variant="primary" to="/catalogo">Continuar explorando</ActionLink>
    </section>
  )
  if (!cart.length) return (
    <EmptyState title="Nenhum item para finalizar."
      description="Adicione uma peça à sacola para simular um pedido."
      action={<ActionLink variant="primary" to="/catalogo">Ir ao catálogo</ActionLink>}
    />
  )

  return <section className="section container checkout-page">
    <h1>Finalizar pedido</h1>
    <Feedback as="div" className="checkout-notice" tone="info"><strong>CHECKOUT DEMONSTRATIVO</strong><p>Este é um case de portfólio. Use dados fictícios: nenhum dado é enviado e nenhum pagamento é processado.</p></Feedback>
    <div className="checkout-grid">
      <form className="checkout-form" aria-labelledby="checkout-details" noValidate onSubmit={submit} onChange={event => {
        if (attempted.current) setErrors(readErrors(event.currentTarget))
      }}>
        <h2 id="checkout-details">Dados do pedido</h2>
        <div className="form-grid"><InputField label="Nome" name="name" error={errors.name} required placeholder="Nome fictício" autoComplete="off" /><InputField label="E-mail" name="email" error={errors.email} required type="email" placeholder="demo@example.com" autoComplete="off" /><InputField label="Telefone" name="phone" error={errors.phone} required type="tel" placeholder="(00) 00000-0000" autoComplete="off" /></div>
        <InputField label="Endereço" name="address" error={errors.address} required placeholder="Endereço fictício, número e complemento" autoComplete="off" />
        {!shippingQuote && (
          <Feedback as="div" id="checkout-shipping-help" className="shipping-help" tone="warning">
            Simule o frete no resumo para continuar.{' '}
            <Button variant="text" onClick={focusShipping}>Ir para o CEP</Button>
          </Feedback>
        )}
        <Button variant="primary" type="submit" disabled={!shippingQuote} aria-describedby={!shippingQuote ? 'checkout-shipping-help' : undefined}>Simular pedido</Button>
      </form>
      <aside className="checkout-summary" aria-labelledby="checkout-summary"><h2 id="checkout-summary">Resumo e frete</h2><ul className="checkout-items">{cart.map(item => <li key={item.key}>{item.quantity}× {item.name} · {item.size}</li>)}</ul><ShippingCalculator inputId={cepId} subtotal={subtotal} cep={shippingCep} onCepChange={onShippingCepChange} /><OrderTotals subtotal={subtotal} quote={shippingQuote} /></aside>
    </div>
  </section>
}
