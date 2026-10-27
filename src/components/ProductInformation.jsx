import { productDetails } from '../data/product-details.js'

export default function ProductInformation({ product }) {
  const detail = productDetails[product.id]
  if (!detail) return null

  return (
    <div className="product-information">
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
          <div className="size-table-wrap"><table className="size-table"><caption>Medidas ilustrativas da peça em centímetros</caption><thead><tr>{detail.columns.map(column => <th scope="col" key={column}>{column}</th>)}</tr></thead><tbody>{detail.measurements.map(row => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th scope="row" key={index}>{cell}</th> : <td key={index}>{cell}</td>)}</tr>)}</tbody></table></div>
          <p className="spec-note">Não use esta tabela como referência para comprar produtos reais.</p>
        </div>
      </details>
    </div>
  )
}
