import { ActionLink } from './design-system/Action.jsx'
import { lazy, useEffect, useMemo, useRef, useState } from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import EmptyState from './components/EmptyState.jsx'
import Home from './pages/Home.jsx'
import Cart from './pages/Cart.jsx'
import { addCartItem, getCartSubtotal, removeCartItem, updateCartItemQuantity } from './lib/cart.js'
import { loadCart, saveCart } from './lib/cart-storage.js'
import Favorites from './pages/Favorites.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import { getShippingQuote } from './lib/shipping.js'
import './styles/app.css'

const Catalog = lazy(() => import('./pages/Catalog.jsx'))
const Product = lazy(() => import('./pages/Product.jsx'))
const Checkout = lazy(() => import('./pages/Checkout.jsx'))

const SiteRouter = import.meta.env.VITE_GITHUB_PAGES ? HashRouter : BrowserRouter

export default function App() {
  const [shippingCep, setShippingCep] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const drawerFocusFallback = useRef(null)
  const [cart, setCart] = useState(() => loadCart())
  useEffect(() => { saveCart(cart) }, [cart])
  const subtotal = useMemo(() => getCartSubtotal(cart), [cart])
  const shippingQuote = getShippingQuote(shippingCep, subtotal)
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart])

  function addToCart(product, size, quantity, restoreFocus) {
    drawerFocusFallback.current = restoreFocus
    setCart(current => addCartItem(current, product, size, quantity))
    setDrawerOpen(true)
  }
  function restoreDrawerFocus() {
    drawerFocusFallback.current?.()
    drawerFocusFallback.current = null
  }

  function updateQuantity(key, quantity) {
    setCart(current => updateCartItemQuantity(current, key, quantity))
  }
  function removeItem(key) {
    setCart(current => removeCartItem(current, key))
  }

  return (
    <FavoritesProvider>
    <SiteRouter useTransitions={false}>
      <Routes>
        <Route element={<Layout shippingQuote={shippingQuote} cartCount={cartCount} cart={cart} subtotal={subtotal} drawerOpen={drawerOpen} onOpenCart={() => setDrawerOpen(true)} onCloseCart={() => setDrawerOpen(false)} onCartClosed={restoreDrawerFocus} onUpdateQuantity={updateQuantity} onRemove={removeItem} />}>
          <Route index element={<Home />} />
          <Route path="favoritos" element={<Favorites />} />
          <Route path="catalogo" element={<Catalog />} />
          <Route path="produto/:id" element={<Product cart={cart} onAddToCart={addToCart} />} />
          <Route path="carrinho" element={<Cart shippingCep={shippingCep} onShippingCepChange={setShippingCep} shippingQuote={shippingQuote} cart={cart} subtotal={subtotal} onUpdateQuantity={updateQuantity} onRemove={removeItem} />} />
          <Route path="*" element={<EmptyState title="Página não encontrada." action={<ActionLink variant="primary" to="/">Voltar ao início</ActionLink>} />} />
          <Route path="checkout" element={<Checkout shippingCep={shippingCep} onShippingCepChange={setShippingCep} shippingQuote={shippingQuote} cart={cart} subtotal={subtotal} />} />
        </Route>
      </Routes>
    </SiteRouter>
    </FavoritesProvider>
  )
}
