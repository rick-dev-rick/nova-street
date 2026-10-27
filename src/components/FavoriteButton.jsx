import { useFavorites } from '../context/FavoritesContext.jsx'

export default function FavoriteButton({ product, showLabel = false }) {
  const { favorites, toggle } = useFavorites()
  const selected = favorites.includes(product.id)
  return <button type="button" className={`favorite-button${selected ? ' selected' : ''}${showLabel ? ' favorite-button-labeled' : ''}`} aria-pressed={selected} aria-label={`${selected ? 'Remover' : 'Salvar'} ${product.name} ${selected ? 'dos' : 'nos'} favoritos`} onClick={() => toggle(product.id)}>
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" fill={selected ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
    {showLabel && <span>{selected ? 'Salvo nos favoritos' : 'Salvar nos favoritos'}</span>}
  </button>
}
