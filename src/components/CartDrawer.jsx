import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export default function CartDrawer({ shippingQuote, open, onClose, cart, subtotal, onUpdateQuantity, onRemove }) {
  const dialog = useRef(null)

  useEffect(() => {
    const element = dialog.current
    if (open && !element.open) element.showModal()
    else if (!open && element.open) element.close()
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [open])

  return (
    <dialog ref={dialog} id="cart-drawer" className="cart-drawer" aria-labelledby="cart-drawer-title" onClose={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div className="drawer-shell">
        <div className="drawer-heading"><div><p className="eyebrow dark">NØVA STREET</p><h2 id="cart-drawer-title">Sua sacola</h2></div><button type="button" className="drawer-close" onClick={onClose} autoFocus aria-label="Fechar sacola">Fechar ×</button></div>
        {cart.length ? <>
          <div className="drawer-items" aria-label="Itens da sacola">
            {cart.map(item => <article className="drawer-item" key={item.key}>
              <Link to={`/produto/${item.id}`} onClick={onClose} tabIndex={-1} aria-hidden="true"><img src={item.image} alt="" /></Link>
              <div className="drawer-item-info"><h3><Link to={`/produto/${item.id}`} onClick={onClose}>{item.name}</Link></h3><p>Tamanho {item.size}</p><strong>{money.format(item.price * item.quantity)}</strong>
                <div className="drawer-item-actions"><div className="quantity-controls" aria-label={`Quantidade de ${item.name}, tamanho ${item.size}`}>
                  <button type="button" aria-label={`Diminuir quantidade de ${item.name}, tamanho ${item.size}`} disabled={item.quantity <= 1} onClick={() => onUpdateQuantity(item.key, item.quantity - 1)}>−</button>
                  <span aria-live="polite" aria-atomic="true">{item.quantity}</span>
                  <button type="button" aria-label={`Aumentar quantidade de ${item.name}, tamanho ${item.size}`} disabled={item.quantity >= 99} onClick={() => onUpdateQuantity(item.key, item.quantity + 1)}>+</button>
                </div><button type="button" className="remove-button" aria-label={`Remover ${item.name}, tamanho ${item.size}`} onClick={() => onRemove(item.key)}>Remover</button></div>
              </div>
            </article>)}
          </div>
          <div className="drawer-summary"><div className="drawer-subtotal" aria-live="polite" aria-atomic="true"><span>Subtotal</span><strong>{money.format(subtotal)}</strong></div><p>{shippingQuote ? `Frete simulado: ${shippingQuote.cost === 0 ? 'grátis' : money.format(shippingQuote.cost)} · total ${money.format(shippingQuote.total)}` : 'Simule o frete na sacola completa ou no checkout.'}</p><Link className="btn btn-primary" to="/checkout" onClick={onClose}>Continuar para checkout</Link><Link className="drawer-cart-link text-link" to="/carrinho" onClick={onClose}>Ver sacola completa →</Link><button type="button" className="drawer-continue" onClick={onClose}>Continuar explorando</button></div>
        </> : <div className="drawer-empty"><span aria-hidden="true">Ø</span><h3>Sua sacola está vazia.</h3><p>Encontre a próxima peça do seu estilo.</p><Link className="btn btn-primary" to="/catalogo" onClick={onClose}>Explorar coleção</Link></div>}
      </div>
    </dialog>
  )
}
