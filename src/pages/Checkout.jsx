import { useState } from 'react'
import { Link } from 'react-router-dom'

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export default function Checkout({ cart, subtotal }) {
  const [confirmed, setConfirmed] = useState(false)
  if (confirmed) return <section className="section container empty-state" role="status"><p className="eyebrow dark">SIMULAÇÃO CONCLUÍDA</p><h1>Seu estilo está na sacola.</h1><p>Pedido demonstrativo de {money.format(subtotal)}. Nenhuma compra foi realizada e seus dados não foram enviados.</p><Link className="btn btn-primary" to="/catalogo">Continuar explorando</Link></section>
  if (!cart.length) return <section className="section container empty-state"><h1>Nenhum item para finalizar.</h1><Link className="btn btn-primary" to="/catalogo">Ir ao catálogo</Link></section>

  return (
    <section className="section container checkout-page">
      <div className="checkout-notice"><strong>CHECKOUT DEMONSTRATIVO</strong><p>Este é um case de portfólio. Nenhum dado é enviado e nenhum pagamento é processado.</p></div>
      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={(e) => { e.preventDefault(); setConfirmed(true) }}>
          <h1>Finalizar pedido</h1>
          <div className="form-grid"><label>Nome<input required placeholder="Seu nome" /></label><label>E-mail<input required type="email" placeholder="voce@email.com" /></label><label>CEP<input required inputMode="numeric" placeholder="00000-000" /></label><label>Telefone<input required placeholder="(00) 00000-0000" /></label></div>
          <label>Endereço<input required placeholder="Rua, número e complemento" /></label>
          <button className="btn btn-primary" type="submit">Simular pedido</button>
        </form>
        <aside className="checkout-summary"><h2>Resumo</h2>{cart.map((item) => <p key={item.key}>{item.quantity}× {item.name} · {item.size}</p>)}<strong>{money.format(subtotal)}</strong></aside>
      </div>
    </section>
  )
}
