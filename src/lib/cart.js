export const MAX_CART_QUANTITY = 99

export function normalizeQuantity(quantity) {
  return Number.isFinite(Number(quantity)) ? Math.min(MAX_CART_QUANTITY, Math.max(1, Math.floor(Number(quantity) || 1))) : 1
}

export function makeCartKey(productId, size) {
  return `${productId}::${size}`
}

export function getRemainingCartQuantity(cart, productId, size) {
  const key = makeCartKey(productId, size)
  const quantity = cart.find(item => item.key === key)?.quantity ?? 0
  return Math.max(0, MAX_CART_QUANTITY - quantity)
}

export function addCartItem(cart, product, size, quantity = 1) {
  const safeQuantity = normalizeQuantity(quantity)
  const key = makeCartKey(product.id, size)
  const existing = cart.find((item) => item.key === key)

  if (existing) {
    return cart.map((item) =>
      item.key === key ? { ...item, quantity: Math.min(MAX_CART_QUANTITY, item.quantity + safeQuantity) } : item,
    )
  }

  return [...cart, { ...product, key, size, quantity: safeQuantity }]
}

export function updateCartItemQuantity(cart, key, quantity) {
  const safeQuantity = normalizeQuantity(quantity)
  return cart.map((item) => (item.key === key ? { ...item, quantity: safeQuantity } : item))
}

export function removeCartItem(cart, key) {
  return cart.filter((item) => item.key !== key)
}

export function getCartSubtotal(cart) {
  return Number(
    cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0).toFixed(2),
  )
}
