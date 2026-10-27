import { Link } from 'react-router-dom'
import { products } from '../data/products.js'
import ProductCard from './ProductCard.jsx'

const featuredIds = ['core-black-hoodie', 'district-cargo-pants', 'redline-street-sneaker', 'utility-backpack']

export default function BestSellers() {
  const featured = featuredIds.map(id => products.find(product => product.id === id)).filter(Boolean)
  return <section className="section container">
    <div className="section-heading"><div><p className="eyebrow dark">OS FAVORITOS DO DROP</p><h2>Mais vendidos.</h2><p className="section-note">Seleção editorial demonstrativa, sem dados de vendas reais.</p></div><Link className="text-link" to="/catalogo">Encontrar minha peça →</Link></div>
    <div className="product-grid">{featured.map(product => <ProductCard product={product} key={product.id} />)}</div>
  </section>
}
