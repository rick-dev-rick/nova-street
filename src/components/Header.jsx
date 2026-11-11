import { NavLink } from 'react-router-dom'
import CategoryNavigation from './CategoryNavigation.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'
import BrandWordmark from '../design-system/BrandWordmark.jsx'
import HeartIcon from '../design-system/HeartIcon.jsx'

export default function Header({ cartCount = 0, onOpenCart, drawerOpen }) {
  const { favorites } = useFavorites()
  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink className="brand" to="/" aria-label="NØVA STREET início">
          <BrandWordmark />
        </NavLink>
        <CategoryNavigation />
        <div className="header-actions">
          <NavLink className="favorites-link" to="/favoritos" aria-label={`Favoritos: ${favorites.length} ${favorites.length === 1 ? 'peça salva' : 'peças salvas'}`}>
            {({ isActive }) => <>
              <HeartIcon filled={isActive} />
              <span className="favorites-label">Favoritos</span>
              <span className="favorites-count">{favorites.length}</span>
            </>}
          </NavLink>
          <button type="button" className="cart-link cart-trigger" onClick={onOpenCart} aria-haspopup="dialog" aria-controls="cart-drawer" aria-expanded={drawerOpen} aria-label={`Abrir sacola com ${cartCount} itens`}>
            Sacola <span>{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
