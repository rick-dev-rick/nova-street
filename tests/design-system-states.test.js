import assert from 'node:assert/strict'
import test from 'node:test'
import { getRemainingCartQuantity, makeCartKey } from '../src/lib/cart.js'

test('cart capacity belongs to the selected product and size', () => {
  const cart = [
    { key: makeCartKey('hoodie', 'M'), quantity: 99 },
    { key: makeCartKey('hoodie', 'G'), quantity: 97 },
  ]
  assert.equal(getRemainingCartQuantity(cart, 'hoodie', 'M'), 0)
  assert.equal(getRemainingCartQuantity(cart, 'hoodie', 'G'), 2)
  assert.equal(getRemainingCartQuantity(cart, 'hoodie', 'P'), 99)
})
