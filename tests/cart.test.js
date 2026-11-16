import test from 'node:test'
import assert from 'node:assert/strict'
import { addCartItem, updateCartItemQuantity, removeCartItem, getCartSubtotal, getCartLineSubtotal, readQuantityInput } from '../src/lib/cart.js'

const tee = { id: 'tee-01', name: 'Essential Oversized Tee', price: 129.9 }

test('adds a new product variant to an empty cart', () => {
  const cart = addCartItem([], tee, 'M', 1)
  assert.equal(cart.length, 1)
  assert.equal(cart[0].quantity, 1)
  assert.equal(cart[0].size, 'M')
})

test('increments an existing product variant instead of duplicating it', () => {
  const once = addCartItem([], tee, 'M', 1)
  const twice = addCartItem(once, tee, 'M', 2)
  assert.equal(twice.length, 1)
  assert.equal(twice[0].quantity, 3)
})

test('keeps different sizes as independent cart lines', () => {
  let cart = addCartItem([], tee, 'M', 1)
  cart = addCartItem(cart, tee, 'G', 1)
  assert.equal(cart.length, 2)
})

test('clamps updated quantity to at least one', () => {
  const cart = addCartItem([], tee, 'M', 1)
  const updated = updateCartItemQuantity(cart, cart[0].key, 0)
  assert.equal(updated[0].quantity, 1)
})

test('removes a cart line by key', () => {
  const cart = addCartItem([], tee, 'M', 1)
  assert.deepEqual(removeCartItem(cart, cart[0].key), [])
})

test('calculates subtotal using price times quantity', () => {
  const cart = addCartItem([], tee, 'M', 2)
  assert.equal(getCartSubtotal(cart), 259.8)
})

test('line subtotals match the bag total across independent product sizes', () => {
  const twoSizes = addCartItem(addCartItem([], tee, 'M', 3), tee, 'G', 1)
  assert.deepEqual(twoSizes.map(getCartLineSubtotal), [389.7, 129.9])
  assert.equal(getCartSubtotal(twoSizes), 519.6)
  assert.equal(getCartLineSubtotal(updateCartItemQuantity(twoSizes, twoSizes[0].key, 5)[0]), 649.5)
})

test('a cleared number input is a draft and valid input respects variant capacity', () => {
  assert.equal(readQuantityInput(NaN), null)
  assert.equal(readQuantityInput(12), 12)
  assert.equal(readQuantityInput(8, 4), 4)
  assert.equal(readQuantityInput(100), 99)
  assert.equal(readQuantityInput(0), 1)
})

test('non-finite quantities cannot corrupt totals', () => {
  const cart = addCartItem([], tee, 'M', Infinity)
  assert.equal(cart[0].quantity, 1)
  assert.equal(updateCartItemQuantity(cart, cart[0].key, Infinity)[0].quantity, 1)
  assert.equal(getCartSubtotal(cart), 129.9)
})

test('empty cart has zero subtotal', () => {
  assert.equal(getCartSubtotal([]), 0)
})

test('caps extreme quantities and repeated additions at 99', () => {
  const cart = addCartItem([], tee, 'M', 1e308)
  assert.equal(cart[0].quantity, 99)
  assert.equal(addCartItem(cart, tee, 'M', 1e308)[0].quantity, 99)
  assert.equal(updateCartItemQuantity(cart, cart[0].key, 1e308)[0].quantity, 99)
  assert.equal(Number.isFinite(getCartSubtotal(cart)), true)
})

test('selected product quantity is added and merged with the matching size', () => {
  let cart = addCartItem([], tee, 'G', 3)
  cart = addCartItem(cart, tee, 'G', '2.8')
  assert.equal(cart[0].quantity, 5)
  assert.equal(getCartSubtotal(cart), 649.5)
})

test('quantity normalization accepts numeric strings and clamps invalid values', async () => {
  const { normalizeQuantity } = await import('../src/lib/cart.js')
  assert.equal(normalizeQuantity('3.9'), 3)
  assert.equal(normalizeQuantity(-2), 1)
  assert.equal(normalizeQuantity(Infinity), 1)
  assert.equal(normalizeQuantity(1000), 99)
})
