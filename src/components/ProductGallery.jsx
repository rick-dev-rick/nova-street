import ChoiceButton from '../design-system/ChoiceButton.jsx'
import Dialog from '../design-system/Dialog.jsx'
import { useId, useRef, useState } from 'react'

export default function ProductGallery({ product }) {
  const [view, setView] = useState(0)
  const dialog = useRef(null)
  const dialogId = useId()
  const titleId = `${dialogId}-title`
  const views = ['Foto editorial', 'Detalhe ampliado']

  return (
    <div className="product-gallery">
      <button type="button" className={`gallery-main gallery-view-${view}`} onClick={() => dialog.current.showModal()} aria-label={`Ampliar ${views[view].toLowerCase()} de ${product.name}`} aria-haspopup="dialog" aria-controls={dialogId}>
        <span className="product-flight-frame" data-product-flight-target>
          <img src={product.image} alt={`${product.name} — ${views[view].toLowerCase()}`} />
        </span>
        <span className="gallery-zoom">Ampliar <span aria-hidden="true">↗</span></span>
      </button>
      <div className="gallery-controls" role="group" aria-label="Visualizações do produto">
        {views.map((label, index) => <ChoiceButton className="gallery-thumb" selected={view === index} onClick={() => setView(index)} key={label}>
          <span className={`gallery-thumb-image gallery-view-${index}`}><img src={product.image} alt="" /></span>
          <span>{label}</span>
        </ChoiceButton>)}
      </div>
      <p className="gallery-caption">Imagem editorial ilustrativa. O detalhe amplia a mesma foto.</p>
      <Dialog className="image-dialog" ref={dialog} id={dialogId} aria-labelledby={titleId} onDismiss={() => dialog.current.close()}>
        <div className="image-dialog-bar"><h2 id={titleId}>{product.name}</h2><button type="button" className="dialog-close" onClick={() => dialog.current.close()} autoFocus>Fechar <span aria-hidden="true">×</span></button></div>
        <div className={`image-dialog-photo gallery-view-${view}`}><img src={product.image} alt={`${product.name} — ${views[view].toLowerCase()}`} /></div>
        <p>{views[view]} · Imagem ilustrativa</p>
      </Dialog>
    </div>
  )
}
