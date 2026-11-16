import { ActionLink } from '../design-system/Action.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ShippingCalculator from '../components/ShippingCalculator.jsx'
import OrderTotals from '../components/OrderTotals.jsx'
import { useLayoutEffect, useRef } from 'react'

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export default function Cart({ shippingCep, onShippingCepChange, shippingQuote, cart, subtotal, onUpdateQuantity, onRemove }) {
  const pendingFocus = useRef(null)
  const emptyAction = useRef(null)

  useLayoutEffect(() => {
    if (!pendingFocus.current) return
    const target = pendingFocus.current.nextRemove ?? emptyAction.current
    pendingFocus.current = null
    target?.focus()
  }, [cart])

  function removeItem(event, key) {
    const line = event.currentTarget.closest('article')
    const adjacentLine = line.nextElementSibling ?? line.previousElementSibling
    pendingFocus.current = { nextRemove: adjacentLine?.querySelector('.remove-button') }
    onRemove(key)
  }

  if (!cart.length) return (
    <EmptyState eyebrow="SACOLA" title="Sua sacola está vazia."
      description="Explore o drop e adicione suas peças favoritas."
      action={<ActionLink ref={emptyAction} variant="primary" to="/catalogo">Ver coleção</ActionLink>}
    />
  )

  return (
    <section className="section container cart-page">
      <div><p className="eyebrow">SACOLA</p><h1>Seu carrinho</h1></div>
      <div className="cart-layout">
        <div className="cart-lines" role="group" aria-label="Itens da sacola">
          {cart.map((item) => (
            <article className="cart-line" key={item.key}>
              <img src={item.image} alt="" />
              <div className="cart-line-info"><h2>{item.name}</h2><p>Tamanho {item.size}</p><strong className="price">{money.format(item.price)}</strong></div>
              <label className="quantity-field"><span>Quantidade</span><input type="number" inputMode="numeric" min="1" max="99" aria-label={`Quantidade de ${item.name}, tamanho ${item.size}`} value={item.quantity} onChange={(e) => onUpdateQuantity(item.key, e.target.value)} /></label>
              <button type="button" className="remove-button" aria-label={`Remover ${item.name}, tamanho ${item.size}`} onClick={event => removeItem(event, item.key)}>Remover</button>
            </article>
          ))}
        </div>
        <aside className="cart-summary"><h2>Resumo</h2><ShippingCalculator subtotal={subtotal} cep={shippingCep} onCepChange={onShippingCepChange} /><OrderTotals subtotal={subtotal} quote={shippingQuote} /><ActionLink variant="primary" to="/checkout">Ir para o checkout</ActionLink></aside>
      </div>
    </section>
  )
}
