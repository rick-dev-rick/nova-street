import { Link } from 'react-router-dom'

export default function EditorialCard({ variant, category, className, children }) {
  const cardClass = variant === 'story' ? 'lifestyle-card' : 'category-card'
  return (
    <Link
      className={className ? `${cardClass} ${className}` : cardClass}
      to={`/catalogo?categoria=${encodeURIComponent(category)}`}
    >
      {children}
    </Link>
  )
}
