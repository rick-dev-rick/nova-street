export function makeCartKey(productId, size) {
  return `${productId}::${size}`
}

export function addCartItem(cart, product, size, quantity = 1) {
  const safeQuantity = Number.isFinite(Number(quantity)) ? Math.min(99, Math.max(1, Math.floor(Number(quantity) || 1))) : 1
  const key = makeCartKey(product.id, size)
  const existing = cart.find((item) => item.key === key)

  if (existing) {
    return cart.map((item) =>
      item.key === key ? { ...item, quantity: Math.min(99, item.quantity + safeQuantity) } : item,
    )
  }

  return [...cart, { ...product, key, size, quantity: safeQuantity }]
}

export function updateCartItemQuantity(cart, key, quantity) {
  const safeQuantity = Number.isFinite(Number(quantity)) ? Math.min(99, Math.max(1, Math.floor(Number(quantity) || 1))) : 1
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
