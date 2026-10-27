import { Link } from 'react-router-dom'

const stories = [
  { title: 'A rua é o seu espaço.', image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=85', category: 'Unissex' },
  { title: 'Vista sua atitude.', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85', category: 'Feminino' },
  { title: 'Seu ritmo. Seu estilo.', image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=85', category: 'Masculino' },
]

export default function Lifestyle() {
  return <section className="section container lifestyle-section">
    <div className="section-heading"><div><p className="eyebrow dark">NØVA LIFESTYLE</p><h2>Além do look.</h2><p className="section-note">Um recorte de inspiração urbana. Editorial ilustrativo.</p></div><Link className="text-link" to="/catalogo">Explore a coleção →</Link></div>
    <div className="lifestyle-grid">{stories.map(story => <Link className="lifestyle-card" key={story.title} to={`/catalogo?categoria=${story.category}`}><img src={story.image} alt={`Inspiração editorial de estilo ${story.category.toLowerCase()}`} loading="lazy" /><span>{story.title}<small>Explorar {story.category.toLowerCase()} ↗</small></span></Link>)}</div>
    <p className="section-note">Editorial do case demonstrativo; não é um feed de Instagram.</p>
  </section>
}
