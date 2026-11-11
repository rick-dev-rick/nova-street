import { useFavorites } from '../context/FavoritesContext.jsx'
import HeartIcon from '../design-system/HeartIcon.jsx'

export default function FavoriteButton({ product, showLabel = false }) {
  const { favorites, toggle } = useFavorites()
  const selected = favorites.includes(product.id)
  return <button type="button" className={`favorite-button${selected ? ' selected' : ''}${showLabel ? ' favorite-button-labeled' : ''}`} aria-pressed={selected} aria-label={`${selected ? 'Remover' : 'Salvar'} ${product.name} ${selected ? 'dos' : 'nos'} favoritos`} onClick={() => toggle(product.id)}>
    <HeartIcon filled={selected} />
    {showLabel && <span>{selected ? 'Salvo nos favoritos' : 'Salvar nos favoritos'}</span>}
  </button>
}
