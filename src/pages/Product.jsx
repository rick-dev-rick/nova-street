import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { products } from '../data/products.js'
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

  if (!product) return <section className="section container empty-state"><h1>Produto não encontrado.</h1><Link className="text-link" to="/catalogo">Voltar ao catálogo →</Link></section>

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
        <p className="eyebrow dark">{product.category} · {product.badge}</p>
        <h1>{product.name}</h1>
        <p className="product-price">{money.format(product.price)}</p>
        <p className="product-description">{product.description}</p>
        <fieldset className="size-selector"><legend>Tamanho</legend><div className="size-options">{product.sizes.map((item) => <button type="button" aria-pressed={size === item} className={size === item ? 'size active' : 'size'} onClick={() => { setSize(item); setAdded(false) }} key={item}>{item}</button>)}</div></fieldset>
        <QuantitySelector value={quantity} onChange={value => { setQuantity(value); setAdded(false) }} />
        <button type="button" className="btn btn-primary product-add" onClick={add} disabled={!size}>{size ? 'Adicionar à sacola' : 'Selecione um tamanho'}</button>
        {added && <p className="success-message" role="status">Adicionado à sacola ✓ <Link className="text-link" to="/carrinho">Ver sacola →</Link></p>}
        <FavoriteButton product={product} showLabel />
        <ProductInformation product={product} />
        <div className="product-benefits"><p>✓ Troca simplificada</p><p>✓ Frete grátis a partir de R$ 299</p><p>✓ Checkout demonstrativo — nenhum pagamento real</p></div>
      </div>
    </section>
    <RelatedProducts product={product} />
    </>
  )
}
