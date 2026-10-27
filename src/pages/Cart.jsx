import { Link } from 'react-router-dom'

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export default function Cart({ cart, subtotal, onUpdateQuantity, onRemove }) {
  if (!cart.length) return <section className="section container empty-state"><p className="eyebrow dark">SACOLA</p><h1>Sua sacola está vazia.</h1><p>Explore o drop e adicione suas peças favoritas.</p><Link className="btn btn-primary" to="/catalogo">Ver coleção</Link></section>

  return (
    <section className="section container cart-page">
      <div><p className="eyebrow dark">SACOLA</p><h1>Seu carrinho</h1></div>
      <div className="cart-layout">
        <div className="cart-lines">
          {cart.map((item) => (
            <article className="cart-line" key={item.key}>
              <img src={item.image} alt="" />
              <div className="cart-line-info"><h2>{item.name}</h2><p>Tamanho {item.size}</p><strong>{money.format(item.price)}</strong></div>
              <label className="quantity-field"><span>Qtd.</span><input type="number" min="1" max="99" aria-label={`Quantidade de ${item.name}, tamanho ${item.size}`} value={item.quantity} onChange={(e) => onUpdateQuantity(item.key, e.target.value)} /></label>
              <button type="button" className="remove-button" onClick={() => onRemove(item.key)}>Remover</button>
            </article>
          ))}
        </div>
        <aside className="cart-summary"><h2>Resumo</h2><div><span>Subtotal</span><strong>{money.format(subtotal)}</strong></div><div><span>Frete</span><span>{subtotal >= 299 ? 'Grátis' : 'Não simulado'}</span></div><hr /><div className="summary-total"><span>Total parcial</span><strong>{money.format(subtotal)}</strong></div><Link className="btn btn-primary" to="/checkout">Continuar</Link></aside>
      </div>
    </section>
  )
}
