import { getCartLineSubtotal } from '../lib/cart.js'

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export default function CartLinePrices({ item }) {
  return (
    <>
      <p>Preço unitário · {money.format(item.price)}</p>
      <p>Subtotal do item · <strong className="price">{money.format(getCartLineSubtotal(item))}</strong></p>
    </>
  )
}
