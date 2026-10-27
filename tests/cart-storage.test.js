import test from 'node:test'
import assert from 'node:assert/strict'
import { loadCart, saveCart } from '../src/lib/cart-storage.js'
import { products } from '../src/data/products.js'
import { addCartItem } from '../src/lib/cart.js'

function memoryStorage(initial) {
  let value = initial
  return { getItem: () => value, setItem: (_, next) => { value = next } }
}

test('restores sizes and quantities after saving, using current catalog prices', () => {
  const storage = memoryStorage(null)
  const cart = addCartItem([], { ...products[0], price: 1 }, 'M', 2)
  saveCart(cart, storage)
  const restored = loadCart(storage)
  assert.equal(restored[0].quantity, 2)
  assert.equal(restored[0].size, 'M')
  assert.equal(restored[0].price, products[0].price)
})

test('removing the last product persists an empty cart', () => {
  const storage = memoryStorage(null)
  saveCart(addCartItem([], products[0], 'G', 1), storage)
  saveCart([], storage)
  assert.deepEqual(loadCart(storage), [])
})

test('corrupt or unavailable browser storage never crashes the storefront', () => {
  assert.deepEqual(loadCart(memoryStorage('{')), [])
  assert.deepEqual(loadCart(memoryStorage('{}')), [])
  const blocked = { getItem() { throw new Error('blocked') }, setItem() { throw new Error('quota') } }
  assert.deepEqual(loadCart(blocked), [])
  assert.doesNotThrow(() => saveCart([], blocked))
})

test('ignores missing products, invalid sizes and malformed entries', () => {
  const storage = memoryStorage(JSON.stringify([null, { id: 'missing', size: 'M', quantity: 1 }, { id: products[0].id, size: 'invalid', quantity: 2 }]))
  assert.deepEqual(loadCart(storage), [])
})

test('restored quantities are bounded and duplicate variants merge', () => {
  const storage = memoryStorage(JSON.stringify([
    { id: products[0].id, size: 'M', quantity: 1000 },
    { id: products[0].id, size: 'M', quantity: 3 },
    { id: products[0].id, size: 'G', quantity: -1 },
  ]))
  const cart = loadCart(storage)
  assert.equal(cart.length, 1)
  assert.equal(cart[0].quantity, 99)
})
