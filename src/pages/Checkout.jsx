import Feedback from '../design-system/Feedback.jsx'
import { ActionLink, Button } from '../design-system/Action.jsx'
import { useEffect, useRef, useState } from 'react'
import EmptyState from '../components/EmptyState.jsx'
import ShippingCalculator from '../components/ShippingCalculator.jsx'
import OrderTotals from '../components/OrderTotals.jsx'
import { getCartLineSubtotal } from '../lib/cart.js'

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
      <p>Pedido demonstrativo de {money.format(confirmed.total)}, incluindo frete simulado. Nenhuma compra foi realizada.</p>
      <p>Os itens continuam na sua sacola. Se quiser simular novamente, volte à sacola e abra o checkout.</p>
      <ActionLink variant="primary" to="/carrinho">Voltar à sacola</ActionLink>
      <ActionLink variant="text" to="/catalogo">Continuar explorando</ActionLink>
    </section>
  )

  if (!cart.length) return (
    <EmptyState title="Nenhum item para finalizar."
      description="Adicione uma peça à sacola para simular um pedido."
      action={<ActionLink variant="primary" to="/catalogo">Ir ao catálogo</ActionLink>}
    />
  )

  return (
    <section className="section container checkout-page">
      <h1>Finalizar pedido</h1>
      <Feedback as="div" className="checkout-notice" tone="info">
        <strong>CHECKOUT DEMONSTRATIVO</strong>
        <p>Revise as peças e simule o frete. Você pode usar o CEP de exemplo. Nenhum dado é enviado e nenhum pagamento é processado.</p>
      </Feedback>
      <div className="checkout-grid">
        <section className="checkout-review" aria-labelledby="checkout-details">
          <h2 id="checkout-details">Peças da simulação</h2>
          <ul className="checkout-items">
            {cart.map(item => (
              <li key={item.key}>
                <span><strong>{item.name}</strong><br />Tamanho {item.size} · {item.quantity} {item.quantity === 1 ? 'peça' : 'peças'}</span>
                <strong className="price">{money.format(getCartLineSubtotal(item))}</strong>
              </li>
            ))}
          </ul>
          <ActionLink variant="text" to="/carrinho">Editar sacola</ActionLink>
        </section>
        <aside className="checkout-summary" aria-labelledby="checkout-summary">
          <h2 id="checkout-summary">Resumo e frete</h2>
          <ShippingCalculator subtotal={subtotal} cep={shippingCep} onCepChange={onShippingCepChange} />
          <OrderTotals subtotal={subtotal} quote={shippingQuote} />
          {!shippingQuote && <p id="checkout-shipping-help">Simule o frete para liberar o pedido demonstrativo.</p>}
          <Button
            variant="primary" className="checkout-submit" disabled={!shippingQuote}
            aria-describedby={!shippingQuote ? 'checkout-shipping-help' : undefined}
            onClick={() => {
              if (shippingQuote) setConfirmed({ total: shippingQuote.total })
            }}
          >
            Simular pedido
          </Button>
        </aside>
      </div>
    </section>
  )
}
