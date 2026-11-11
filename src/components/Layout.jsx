import { Suspense, useEffect, useRef } from 'react'
import LoadingStatus from '../design-system/LoadingStatus.jsx'
import RouteErrorBoundary from './RouteErrorBoundary.jsx'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import CartDrawer from './CartDrawer.jsx'

export default function Layout({ shippingQuote, cartCount, cart, subtotal, drawerOpen, onOpenCart, onCloseCart, onCartClosed, onUpdateQuantity, onRemove }) {
  const { pathname } = useLocation()
  const main = useRef(null)
  const previousPath = useRef(pathname)

  useEffect(() => {
    if (previousPath.current === pathname) return
    previousPath.current = pathname
    const frame = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
      main.current?.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname])

  return (
    <>
      <a className="skip-link" href="#conteudo" onClick={(event) => { event.preventDefault(); main.current.focus() }}>Pular para o conteúdo</a>
      <Header cartCount={cartCount} onOpenCart={onOpenCart} drawerOpen={drawerOpen} />
      <main ref={main} id="conteudo" tabIndex={-1}>
        <RouteErrorBoundary pathname={pathname}>
          <Suspense fallback={<LoadingStatus />}>
            <div className="route-view" key={pathname}><Outlet /></div>
          </Suspense>
        </RouteErrorBoundary>
      </main>
      <Footer />
      <CartDrawer shippingQuote={shippingQuote} open={drawerOpen} onClose={onCloseCart} onClosed={onCartClosed} cart={cart} subtotal={subtotal} onUpdateQuantity={onUpdateQuantity} onRemove={onRemove} />
    </>
  )
}
