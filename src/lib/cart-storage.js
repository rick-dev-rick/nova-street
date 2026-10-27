import { products } from '../data/products.js'
import { addCartItem } from './cart.js'

const STORAGE_KEY = 'nova-street:cart:v1'

// Store only product references; prices and descriptions always come from the catalog.
export function loadCart(storage) {
  try {
    const entries = JSON.parse((storage ?? window.localStorage).getItem(STORAGE_KEY) ?? '[]')
    if (!Array.isArray(entries)) return []
    return entries.reduce((cart, entry) => {
      if (!entry || typeof entry !== 'object') return cart
      const product = products.find((item) => item.id === entry.id)
      if (!product || !product.sizes.includes(entry.size)) return cart
      if (!Number.isFinite(entry.quantity) || entry.quantity < 1) return cart
      return addCartItem(cart, product, entry.size, entry.quantity)
    }, [])
  } catch {
    return []
  }
}

export function saveCart(cart, storage) {
  try {
    const entries = cart.map(({ id, size, quantity }) => ({ id, size, quantity }))
    ;(storage ?? window.localStorage).setItem(STORAGE_KEY, JSON.stringify(entries))
    return true
  } catch {
    // Private browsing or quota restrictions must not prevent shopping in memory.
    return false
  }
}
