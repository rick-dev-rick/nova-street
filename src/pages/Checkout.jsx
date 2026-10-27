import { useState } from 'react'
import { Link } from 'react-router-dom'
import ShippingCalculator from '../components/ShippingCalculator.jsx'
import OrderTotals from '../components/OrderTotals.jsx'

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export default function Checkout({ cart, subtotal, shippingCep, onShippingCepChange, shippingQuote }) {
  const [confirmed, setConfirmed] = useState(null)
  if (confirmed) return <section className="section container empty-state" role="status"><p className="eyebrow dark">SIMULAÇÃO CONCLUÍDA</p><h1>Seu estilo está na sacola.</h1><p>Pedido demonstrativo de {money.format(confirmed.total)}, incluindo frete simulado. Nenhuma compra foi realizada e seus dados não foram enviados.</p><Link className="btn btn-primary" to="/catalogo">Continuar explorando</Link></section>
  if (!cart.length) return <section className="section container empty-state"><h1>Nenhum item para finalizar.</h1><Link className="btn btn-primary" to="/catalogo">Ir ao catálogo</Link></section>

  return <section className="section container checkout-page">
    <div className="checkout-notice"><strong>CHECKOUT DEMONSTRATIVO</strong><p>Este é um case de portfólio. Use dados fictícios: nenhum dado é enviado e nenhum pagamento é processado.</p></div>
    <div className="checkout-grid">
      <form className="checkout-form" onSubmit={event => { event.preventDefault(); if (shippingQuote) setConfirmed({ total: shippingQuote.total }) }}>
        <h1>Finalizar pedido</h1>
        <div className="form-grid"><label>Nome<input required placeholder="Nome fictício" autoComplete="off" /></label><label>E-mail<input required type="email" placeholder="demo@example.com" autoComplete="off" /></label><label>Telefone<input required type="tel" placeholder="(00) 00000-0000" autoComplete="off" /></label></div>
        <label>Endereço<input required placeholder="Endereço fictício, número e complemento" autoComplete="off" /></label>
        {!shippingQuote && <p className="shipping-help">Simule o frete no resumo para continuar.</p>}
        <button className="btn btn-primary" type="submit" disabled={!shippingQuote}>Simular pedido</button>
      </form>
      <aside className="checkout-summary"><h2>Resumo</h2>{cart.map(item => <p key={item.key}>{item.quantity}× {item.name} · {item.size}</p>)}<ShippingCalculator subtotal={subtotal} cep={shippingCep} onCepChange={onShippingCepChange} /><OrderTotals subtotal={subtotal} quote={shippingQuote} /></aside>
    </div>
  </section>
}
