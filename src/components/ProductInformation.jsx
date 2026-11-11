import SizeTable from './SizeTable.jsx'
import { productDetails } from '../data/product-details.js'

export default function ProductInformation({ product }) {
  const detail = productDetails[product.id]
  if (!detail) return null

  return (
    <section className="product-information" aria-labelledby="product-information-title">
      <h2 id="product-information-title">Detalhes da peça</h2>
      <p className="spec-note">Coleção fictícia · especificações e medidas demonstrativas.</p>
      <details className="product-disclosure" open>
        <summary>Composição e caimento</summary>
        <div><p>{detail.composition}</p><p>{detail.fit}</p></div>
      </details>
      <details className="product-disclosure">
        <summary>Cuidados com a peça</summary>
        <div><p>{detail.care}</p></div>
      </details>
      <details className="product-disclosure">
        <summary>Guia de tamanhos</summary>
        <div>
          <p>{detail.measureHelp}</p>
          <SizeTable columns={detail.columns} measurements={detail.measurements} />
          <p className="spec-note">Não use esta tabela como referência para comprar produtos reais.</p>
        </div>
      </details>
    </section>
  )
}
