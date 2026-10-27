import { useRef, useState } from 'react'

export default function ProductGallery({ product }) {
  const [view, setView] = useState(0)
  const dialog = useRef(null)
  const views = ['Foto editorial', 'Detalhe ampliado']

  return (
    <div className="product-gallery">
      <button type="button" className={`gallery-main gallery-view-${view}`} onClick={() => dialog.current.showModal()} aria-label={`Ampliar ${views[view].toLowerCase()} de ${product.name}`}>
        <img src={product.image} alt={`${product.name} — ${views[view].toLowerCase()}`} />
        <span className="gallery-zoom">Ampliar ↗</span>
      </button>
      <div className="gallery-controls" aria-label="Visualizações do produto">
        {views.map((label, index) => <button type="button" className={view === index ? 'gallery-thumb active' : 'gallery-thumb'} aria-pressed={view === index} onClick={() => setView(index)} key={label}>
          <span className={`gallery-thumb-image gallery-view-${index}`}><img src={product.image} alt="" /></span>
          <span>{label}</span>
        </button>)}
      </div>
      <p className="gallery-caption">Imagem editorial ilustrativa. O detalhe amplia a mesma foto.</p>
      <dialog className="image-dialog" ref={dialog} aria-labelledby="image-dialog-title" onClick={(event) => { if (event.target === event.currentTarget) dialog.current.close() }}>
        <div className="image-dialog-bar"><h2 id="image-dialog-title">{product.name}</h2><button type="button" className="dialog-close" onClick={() => dialog.current.close()} autoFocus>Fechar ×</button></div>
        <div className={`image-dialog-photo gallery-view-${view}`}><img src={product.image} alt={`${product.name} — ${views[view].toLowerCase()}`} /></div>
        <p>{views[view]} · Imagem ilustrativa</p>
      </dialog>
    </div>
  )
}
