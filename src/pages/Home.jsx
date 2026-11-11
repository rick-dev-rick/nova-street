import EditorialCard from '../components/EditorialCard.jsx'
import { ActionLink } from '../design-system/Action.jsx'
import BestSellers from '../components/BestSellers.jsx'
import Lifestyle from '../components/Lifestyle.jsx'
import FinalCTA from '../components/FinalCTA.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { products } from '../data/products.js'
import { selectProducts } from '../lib/catalog.js'

export default function Home() {
  return (
    <>
      <section className="hero" data-nova-theme="dark">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <p className="eyebrow">DROP 01 · 2026</p>
          <h1>NEW DROP<br />STREET ESSENTIALS</h1>
          <p>Peças urbanas, versáteis e sem rótulos para quem veste identidade.</p>
          <ActionLink variant="primary" to="/catalogo">Ver coleção</ActionLink>
        </div>
      </section>

      <aside className="promo-strip" aria-label="Condição de frete">
        <p><strong>Frete grátis a partir de R$ 299</strong> no checkout demonstrativo.</p>
      </aside>

      <section className="section container">
        <div className="section-heading">
          <div><p className="eyebrow">EXPLORE</p><h2>Vista do seu jeito.</h2></div>
          <ActionLink variant="text" to="/catalogo">Ver tudo →</ActionLink>
        </div>
        <div className="category-grid">
          {['Masculino', 'Feminino', 'Unissex'].map((category, index) => (
            <EditorialCard variant="category" className={`category-${index + 1}`} category={category} key={category}>
              <span>{category}</span>
            </EditorialCard>
          ))}
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow">NOVIDADES</p><h2>Chegou agora.</h2></div>
            <ActionLink variant="text" to="/catalogo?ordem=novidades">Ver novidades →</ActionLink>
          </div>
          <div className="product-grid">{selectProducts(products, { order: 'novidades' }).slice(0, 4).map((product) => <ProductCard product={product} key={product.id} />)}</div>
        </div>
      </section>

      <section className="featured-drop" data-nova-theme="dark">
        <div className="container featured-drop-inner">
          <div>
            <p className="eyebrow">NØVA STREET · DROP 01</p>
            <h2>NO RULES.<br />JUST STREET.</h2>
          </div>
          <div>
            <p>Uma coleção construída para misturar proporções, camadas e atitude sem limitar estilo por gênero.</p>
            <ActionLink variant="secondary" to="/catalogo">Explorar o drop</ActionLink>
          </div>
        </div>
      </section>

      <BestSellers />

      <Lifestyle />
      <FinalCTA />
    </>
  )
}
