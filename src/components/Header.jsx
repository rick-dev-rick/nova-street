import { Link, NavLink, useLocation } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext.jsx'

export default function Header({ cartCount = 0, onOpenCart, drawerOpen }) {
  const { favorites } = useFavorites()
  const location = useLocation()
  const category = new URLSearchParams(location.search).get('categoria')
  const navClass = (value) => location.pathname === '/catalogo' && category === value ? 'active' : undefined
  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink className="brand" to="/" aria-label="NØVA STREET início">
          NØVA <span>STREET</span>
        </NavLink>
        <nav className="main-nav" aria-label="Navegação principal">
          <Link className={navClass(null)} to="/catalogo">Novidades</Link>
          <Link className={navClass('Masculino')} to="/catalogo?categoria=Masculino">Masculino</Link>
          <Link className={navClass('Feminino')} to="/catalogo?categoria=Feminino">Feminino</Link>
          <Link className={navClass('Unissex')} to="/catalogo?categoria=Unissex">Unissex</Link>
          <Link className={navClass('Acessórios')} to="/catalogo?categoria=Acessórios">Acessórios</Link>
        </nav>
        <div className="header-actions">
        <NavLink className="favorites-link" to="/favoritos" aria-label={`Favoritos: ${favorites.length} ${favorites.length === 1 ? 'peça salva' : 'peças salvas'}`}><span aria-hidden="true">♡</span><span className="favorites-label">Favoritos</span><span className="favorites-count">{favorites.length}</span></NavLink>
        <button type="button" className="cart-link cart-trigger" onClick={onOpenCart} aria-haspopup="dialog" aria-controls="cart-drawer" aria-expanded={drawerOpen} aria-label={`Abrir sacola com ${cartCount} itens`}>
          Sacola <span>{cartCount}</span>
        </button>
        </div>
      </div>
    </header>
  )
}
