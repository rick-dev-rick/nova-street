import EditorialCard from '../components/EditorialCard.jsx'
import { ActionLink } from '../design-system/Action.jsx'
import BestSellers from '../components/BestSellers.jsx'
import Lifestyle from '../components/Lifestyle.jsx'
import FinalCTA from '../components/FinalCTA.jsx'
import HomeSignature from '../components/HomeSignature.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { products } from '../data/products.js'
import { selectProducts } from '../lib/catalog.js'

import '../styles/hero-showcase.css'
import '../styles/scroll-showcase.css'
import '../styles/home-signature.css'

const heroPhoto = 'https://images.unsplash.com/photo-1523398002811-999ca8dec234'
const heroSource = width => `${heroPhoto}?auto=format&fit=crop&w=${width}&q=85`

export default function Home() {
  return (
    <>
      <section className="hero" data-nova-theme="dark" aria-labelledby="drop-title">
        <div className="hero-shot" aria-hidden="true">
          <img
            className="hero-photo"
            src={heroSource(1440)}
            srcSet={`${heroSource(800)} 800w, ${heroSource(1440)} 1440w, ${heroSource(1800)} 1800w`}
            sizes="(max-width: 760px) 100vw, 61vw"
            width={1800}
            height={2584}
            fetchPriority="high"
            alt=""
          />
        </div>
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-frame" aria-hidden="true" />
        <div className="container hero-content">
          <p className="eyebrow hero-edition">DROP 01 · 2026</p>
          <h1 className="hero-display" id="drop-title">
            <span className="hero-display-line"><span>NEW DROP</span></span>{' '}
            <span className="hero-display-line"><span>STREET</span></span>{' '}
            <span className="hero-display-line"><span>ESSENTIALS</span></span>
          </h1>
          <p className="hero-description">Peças urbanas, versáteis e sem rótulos para quem veste identidade.</p>
          <ActionLink variant="primary" className="hero-action" to="/catalogo">
            Ver coleção <span className="hero-action-arrow" aria-hidden="true" />
          </ActionLink>
        </div>
      </section>

      <aside className="promo-strip" data-scroll-scene="exit" aria-label="Condição de frete">
        <p><strong>Frete grátis a partir de R$ 299</strong> no checkout demonstrativo.</p>
      </aside>

      <section className="section container" data-scroll-scene="explore">
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

      <section className="section section-soft" data-scroll-scene="new">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow">NOVIDADES</p><h2>Chegou agora.</h2></div>
            <ActionLink variant="text" to="/catalogo?ordem=novidades">Ver novidades →</ActionLink>
          </div>
          <div className="product-grid">{selectProducts(products, { order: 'novidades' }).slice(0, 4).map((product) => <ProductCard product={product} key={product.id} />)}</div>
        </div>
      </section>

      <section className="featured-drop" data-scroll-scene="drop" data-nova-theme="dark">
        <div className="director-stage">
          <div className="director-art" aria-hidden="true" />
          <div className="container featured-drop-inner">
            <div>
              <p className="eyebrow">NØVA STREET · DROP 01</p>
              <h2>
                <span className="director-title-line"><span>NO RULES.</span></span>{' '}
                <span className="director-title-line"><span>JUST STREET.</span></span>
              </h2>
            </div>
            <div className="director-drop-copy">
              <p>Uma coleção construída para misturar proporções, camadas e atitude sem limitar estilo por gênero.</p>
              <ActionLink variant="secondary" to="/catalogo">Explorar o drop</ActionLink>
            </div>
          </div>
        </div>
      </section>

      <BestSellers />

      <Lifestyle />
      <div className="home-finale" data-scroll-scene="outro"><FinalCTA /></div>
      <HomeSignature />
    </>
  )
}
