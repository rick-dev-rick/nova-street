import assert from 'node:assert/strict'
import test from 'node:test'
import { getRemainingCartQuantity, makeCartKey } from '../src/lib/cart.js'
import { validateCheckout } from '../src/lib/checkout-validation.js'

test('cart capacity belongs to the selected product and size', () => {
  const cart = [
    { key: makeCartKey('hoodie', 'M'), quantity: 99 },
    { key: makeCartKey('hoodie', 'G'), quantity: 97 },
  ]
  assert.equal(getRemainingCartQuantity(cart, 'hoodie', 'M'), 0)
  assert.equal(getRemainingCartQuantity(cart, 'hoodie', 'G'), 2)
  assert.equal(getRemainingCartQuantity(cart, 'hoodie', 'P'), 99)
})

test('checkout reports empty fields in form order and rejects malformed email', () => {
  const errors = validateCheckout({ name: ' ', email: 'invalid', phone: '', address: '' }, true)
  assert.deepEqual(Object.keys(errors), ['name', 'email', 'phone', 'address'])
  assert.equal(errors.email, 'Informe um e-mail válido.')
  assert.equal(validateCheckout({ email: '' }, true).email, 'Informe um e-mail fictício.')
})

test('valid demo data leaves no validation errors', () => {
  assert.deepEqual(validateCheckout({ name: 'Pessoa Demo', email: 'demo@example.com', phone: '61987654321', address: 'Rua fictícia, 1' }, false), {})
})
