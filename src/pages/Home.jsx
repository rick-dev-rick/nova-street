import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { products } from '../data/products.js'
import { selectProducts } from '../lib/catalog.js'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <p className="eyebrow">DROP 01 · 2026</p>
          <h1>NEW DROP<br />STREET ESSENTIALS</h1>
          <p>Peças urbanas, versáteis e sem rótulos para quem veste identidade.</p>
          <Link className="btn btn-primary" to="/catalogo">Ver coleção</Link>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading">
          <div><p className="eyebrow dark">EXPLORE</p><h2>Vista do seu jeito.</h2></div>
          <Link className="text-link" to="/catalogo">Ver tudo →</Link>
        </div>
        <div className="category-grid">
          {['Masculino', 'Feminino', 'Unissex'].map((category, index) => (
            <Link className={`category-card category-${index + 1}`} to={`/catalogo?categoria=${category}`} key={category}>
              <span>{category}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-heading"><div><p className="eyebrow dark">NOVIDADES</p><h2>Chegou agora.</h2></div></div>
          <div className="product-grid">{selectProducts(products, { order: 'novidades' }).slice(0, 4).map((product) => <ProductCard product={product} key={product.id} />)}</div>
        </div>
      </section>

      <section className="featured-drop">
        <div className="container featured-drop-inner">
          <div>
            <p className="eyebrow">NØVA STREET · DROP 01</p>
            <h2>NO RULES.<br />JUST STREET.</h2>
          </div>
          <div>
            <p>Uma coleção construída para misturar proporções, camadas e atitude sem limitar estilo por gênero.</p>
            <Link className="btn btn-light" to="/catalogo">Explorar o drop</Link>
          </div>
        </div>
      </section>

      <section className="promo-strip">
        <span>IDENTIDADE SEM RÓTULOS</span><span>•</span><span>FRETE GRÁTIS ACIMA DE R$ 299</span>
      </section>
    </>
  )
}
