export default function SizeTable({ columns, measurements }) {
  return (
    <div className="size-table-wrap" tabIndex={0} role="region" aria-label="Tabela de medidas">
      <table className="size-table">
        <caption>Medidas ilustrativas da peça em centímetros</caption>
        <thead>
          <tr>{columns.map(column => <th scope="col" key={column}>{column}</th>)}</tr>
        </thead>
        <tbody>
          {measurements.map(([size, ...values]) => (
            <tr key={size}>
              <th scope="row">{size}</th>
              {values.map((value, index) => <td key={columns[index + 1]}>{value}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
