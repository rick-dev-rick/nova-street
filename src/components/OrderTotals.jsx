const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export default function OrderTotals({ subtotal, quote }) {
  return <div className="order-totals" aria-live="polite" aria-atomic="true">
    <div><span>Subtotal</span><strong className="price">{money.format(subtotal)}</strong></div>
    <div><span>Frete simulado</span><span>{quote ? (quote.cost === 0 ? 'Grátis' : <span className="price">{money.format(quote.cost)}</span>) : 'Informe o CEP'}</span></div>
    <div className="order-total"><span>{quote ? 'Total demonstrativo' : 'Total parcial'}</span><strong className="price">{money.format(quote ? quote.total : subtotal)}</strong></div>
  </div>
}
