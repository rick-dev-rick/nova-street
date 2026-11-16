import { ActionLink } from '../design-system/Action.jsx'

const editorialPhoto = 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85'

export default function FinalCTA() {
  return (
    <section className="final-cta" data-nova-theme="dark" aria-labelledby="final-cta-title">
      <div className="final-cta-visual" aria-hidden="true">
        <img src={editorialPhoto} width={900} height={1350} loading="lazy" decoding="async" alt="" />
      </div>
      <div className="container final-cta-content">
        <p className="eyebrow">SUA PRÓXIMA VERSÃO</p>
        <h2 id="final-cta-title">
          <span className="final-cta-line">Encontre seu estilo.</span>{' '}
          <span className="final-cta-line">Vista NØVA.</span>
        </h2>
        <p>Essenciais para misturar, experimentar e fazer do seu jeito.</p>
        <ActionLink variant="secondary" to="/catalogo">
          Encontrar meu estilo →
        </ActionLink>
      </div>
    </section>
  )
}
