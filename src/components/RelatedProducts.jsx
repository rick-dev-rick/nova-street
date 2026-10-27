import { Link } from 'react-router-dom'
import { products } from '../data/products.js'
import { getRelatedProducts } from '../lib/related-products.js'
import ProductCard from './ProductCard.jsx'

export default function RelatedProducts({ product }) {
  const related = getRelatedProducts(products, product)
  if (!related.length) return null

  return <section className="section section-soft related-products" aria-labelledby="related-products-title">
    <div className="container">
      <div className="section-heading"><div><p className="eyebrow dark">CONTINUE EXPLORANDO</p><h2 id="related-products-title">Você também pode curtir.</h2></div><Link className="text-link" to="/catalogo">Ver toda a coleção →</Link></div>
      <div className="product-grid">{related.map(item => <ProductCard product={item} key={item.id} />)}</div>
    </div>
  </section>
}
