import ChoiceButton from '../design-system/ChoiceButton.jsx'
import Feedback from '../design-system/Feedback.jsx'
import { ActionLink, Button } from '../design-system/Action.jsx'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { products } from '../data/products.js'
import EmptyState from '../components/EmptyState.jsx'
import QuantitySelector from '../components/QuantitySelector.jsx'
import RelatedProducts from '../components/RelatedProducts.jsx'
import FavoriteButton from '../components/FavoriteButton.jsx'
import ProductGallery from '../components/ProductGallery.jsx'
import ProductInformation from '../components/ProductInformation.jsx'

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export default function Product({ onAddToCart }) {
  const { id } = useParams()
  useEffect(() => { window.scrollTo(0, 0) }, [id])
  return <ProductDetail key={id} id={id} onAddToCart={onAddToCart} />
}

function ProductDetail({ id, onAddToCart }) {
  const product = useMemo(() => products.find((item) => item.id === id), [id])
  const [size, setSize] = useState('')
  const [added, setAdded] = useState(false)
  const [quantity, setQuantity] = useState(1)

  if (!product) return (
    <EmptyState title="Produto não encontrado."
      action={<ActionLink variant="primary" to="/catalogo">Voltar ao catálogo</ActionLink>}
    />
  )

  function add() {
    if (!product.sizes.includes(size)) return
    onAddToCart(product, size, quantity)
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
        <section className="product-purchase" aria-labelledby="purchase-title">
          <h2 id="purchase-title">Escolha sua peça</h2>
          <fieldset className="size-selector"><legend>Tamanho</legend><div className="size-options">{product.sizes.map((item) => <ChoiceButton className="size" selected={size === item} onClick={() => { setSize(item); setAdded(false) }} key={item}>{item}</ChoiceButton>)}</div></fieldset>
          <QuantitySelector value={quantity} onChange={value => { setQuantity(value); setAdded(false) }} />
          <Button variant="primary" className="product-add" onClick={add} disabled={!size} aria-describedby="purchase-help">Adicionar à sacola</Button>
          <p id="purchase-help" className="purchase-help">{size ? `Tamanho selecionado: ${size}.` : 'Selecione um tamanho para adicionar à sacola.'}</p>
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
