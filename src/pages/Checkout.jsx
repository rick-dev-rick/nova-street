import { InputField } from '../design-system/Field.jsx'
import Feedback from '../design-system/Feedback.jsx'
import { ActionLink, Button } from '../design-system/Action.jsx'
import { useEffect, useRef, useState } from 'react'
import EmptyState from '../components/EmptyState.jsx'
import ShippingCalculator from '../components/ShippingCalculator.jsx'
import OrderTotals from '../components/OrderTotals.jsx'

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export default function Checkout({ cart, subtotal, shippingCep, onShippingCepChange, shippingQuote }) {
  const [confirmed, setConfirmed] = useState(null)
  const confirmationTitle = useRef(null)

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
      <form className="checkout-form" aria-labelledby="checkout-details" onSubmit={event => { event.preventDefault(); if (shippingQuote) setConfirmed({ total: shippingQuote.total }) }}>
        <h2 id="checkout-details">Dados do pedido</h2>
        <div className="form-grid"><InputField label="Nome" required placeholder="Nome fictício" autoComplete="off" /><InputField label="E-mail" required type="email" placeholder="demo@example.com" autoComplete="off" /><InputField label="Telefone" required type="tel" placeholder="(00) 00000-0000" autoComplete="off" /></div>
        <InputField label="Endereço" required placeholder="Endereço fictício, número e complemento" autoComplete="off" />
        {!shippingQuote && <Feedback className="shipping-help" tone="warning">Simule o frete no resumo para continuar.</Feedback>}
        <Button variant="primary" type="submit" disabled={!shippingQuote}>Simular pedido</Button>
      </form>
      <aside className="checkout-summary" aria-labelledby="checkout-summary"><h2 id="checkout-summary">Resumo e frete</h2><ul className="checkout-items">{cart.map(item => <li key={item.key}>{item.quantity}× {item.name} · {item.size}</li>)}</ul><ShippingCalculator subtotal={subtotal} cep={shippingCep} onCepChange={onShippingCepChange} /><OrderTotals subtotal={subtotal} quote={shippingQuote} /></aside>
    </div>
  </section>
}
