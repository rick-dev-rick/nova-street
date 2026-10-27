import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import CartDrawer from './CartDrawer.jsx'

export default function Layout({ cartCount, cart, subtotal, drawerOpen, onOpenCart, onCloseCart, onUpdateQuantity, onRemove }) {
  return (
    <>
      <a className="skip-link" href="#conteudo" onClick={(event) => { event.preventDefault(); document.getElementById('conteudo').focus() }}>Pular para o conteúdo</a>
      <Header cartCount={cartCount} onOpenCart={onOpenCart} drawerOpen={drawerOpen} />
      <main id="conteudo" tabIndex={-1}><Outlet /></main>
      <Footer />
      <CartDrawer open={drawerOpen} onClose={onCloseCart} cart={cart} subtotal={subtotal} onUpdateQuantity={onUpdateQuantity} onRemove={onRemove} />
    </>
  )
}
