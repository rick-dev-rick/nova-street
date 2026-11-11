import { Suspense } from 'react'
import LoadingStatus from '../design-system/LoadingStatus.jsx'
import RouteErrorBoundary from './RouteErrorBoundary.jsx'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import CartDrawer from './CartDrawer.jsx'

export default function Layout({ shippingQuote, cartCount, cart, subtotal, drawerOpen, onOpenCart, onCloseCart, onUpdateQuantity, onRemove }) {
  const { pathname } = useLocation()

  return (
    <>
      <a className="skip-link" href="#conteudo" onClick={(event) => { event.preventDefault(); document.getElementById('conteudo').focus() }}>Pular para o conteúdo</a>
      <Header cartCount={cartCount} onOpenCart={onOpenCart} drawerOpen={drawerOpen} />
      <main id="conteudo" tabIndex={-1}>
        <RouteErrorBoundary pathname={pathname}>
          <Suspense fallback={<LoadingStatus />}><Outlet /></Suspense>
        </RouteErrorBoundary>
      </main>
      <Footer />
      <CartDrawer shippingQuote={shippingQuote} open={drawerOpen} onClose={onCloseCart} cart={cart} subtotal={subtotal} onUpdateQuantity={onUpdateQuantity} onRemove={onRemove} />
    </>
  )
}
