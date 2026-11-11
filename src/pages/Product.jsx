import { getRemainingCartQuantity } from '../lib/cart.js'
import ChoiceButton from '../design-system/ChoiceButton.jsx'
import Feedback from '../design-system/Feedback.jsx'
import { ActionLink, Button } from '../design-system/Action.jsx'
import { useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { products } from '../data/products.js'
import EmptyState from '../components/EmptyState.jsx'
import QuantitySelector from '../components/QuantitySelector.jsx'
import RelatedProducts from '../components/RelatedProducts.jsx'
import FavoriteButton from '../components/FavoriteButton.jsx'
import ProductGallery from '../components/ProductGallery.jsx'
import ProductInformation from '../components/ProductInformation.jsx'

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export default function Product({ cart, onAddToCart }) {
  const { id } = useParams()
  return <ProductDetail key={id} id={id} cart={cart} onAddToCart={onAddToCart} />
}

function ProductDetail({ id, cart, onAddToCart }) {
  const product = useMemo(() => products.find((item) => item.id === id), [id])
  const [size, setSize] = useState('')
  const purchaseSection = useRef(null)
  const [added, setAdded] = useState(false)
  const [quantity, setQuantity] = useState(1)

  if (!product) return (
    <EmptyState title="Produto não encontrado."
      action={<ActionLink variant="primary" to="/catalogo">Voltar ao catálogo</ActionLink>}
    />
  )

  const remaining = getRemainingCartQuantity(cart, product.id, size)
  const unavailable = product.sizes.length === 0 || remaining === 0
  const maxQuantity = Math.max(1, remaining)
  const selectedQuantity = Math.min(quantity, maxQuantity)

  function add(event) {
    if (unavailable || !product.sizes.includes(size)) return
    const opener = event.currentTarget
    onAddToCart(product, size, selectedQuantity, () => {
      if (opener.isConnected && opener.disabled) {
        purchaseSection.current?.querySelector('.size[aria-pressed="true"]')?.focus()
      }
    })
    setAdded(true)
  }

  return (
    <>
    <section className="section container product-page">
      <ProductGallery product={product} />
      <div className="product-detail-info">
        <p className="eyebrow">{product.category} · {product.badge}</p>
        <h1>{product.name}</h1>
        <p className="price product-price">{money.format(product.price)}</p>
        <p className="product-description">{product.description}</p>
        <section ref={purchaseSection} className="product-purchase" aria-labelledby="purchase-title">
          <h2 id="purchase-title">Escolha sua peça</h2>
          <fieldset className="size-selector"><legend>Tamanho</legend><div className="size-options">{product.sizes.map((item) => <ChoiceButton className="size" selected={size === item} onClick={() => { setSize(item); setAdded(false) }} key={item}>{item}</ChoiceButton>)}</div></fieldset>
          <QuantitySelector value={selectedQuantity} max={maxQuantity} disabled={unavailable} onChange={value => { setQuantity(value); setAdded(false) }} />
          <Button variant="primary" className="product-add" onClick={add} disabled={!size || unavailable} aria-describedby="purchase-help">Adicionar à sacola</Button>
          <div id="purchase-help" className="purchase-help" aria-live="polite" aria-atomic="true">
            {unavailable ? (
              <Feedback tone="warning">
                {size ? 'Você atingiu o limite deste tamanho na sacola.' : 'Nenhum tamanho disponível nesta demonstração.'}
              </Feedback>
            ) : size ? `Tamanho selecionado: ${size}. Você pode adicionar até ${remaining}.` : 'Selecione um tamanho para adicionar à sacola.'}
          </div>
          {added && <Feedback className="success-message" tone="success">Adicionado à sacola ✓ <ActionLink variant="text" to="/carrinho">Ver sacola →</ActionLink></Feedback>}
          <FavoriteButton product={product} showLabel />
        </section>
        <ProductInformation product={product} />
        <div className="product-benefits"><p>✓ Troca simplificada</p><p>✓ Frete grátis a partir de R$ 299</p><p>✓ Checkout demonstrativo — nenhum pagamento real</p></div>
      </div>
    </section>
    <RelatedProducts product={product} />
    </>
  )
}
