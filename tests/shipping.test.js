import test from 'node:test'
import assert from 'node:assert/strict'
import { DEMO_SHIPPING_CEP, formatShippingCep, getShippingQuote, normalizeShippingCep } from '../src/lib/shipping.js'

test('formatted CEP yields a local demo quote including shipping in the total', () => {
  const quote = getShippingQuote('12345-678', 129.9)
  assert.equal(quote.cep, '12345678')
  assert.equal(quote.cost, 19.9)
  assert.equal(quote.total, 149.8)
})
test('malformed, missing or repeated CEPs do not produce quotes', () => {
  for (const cep of ['', '12345', '123456789', 'abcdefgh', 'abc12345678', '00000-000', '11111111']) {
    assert.equal(getShippingQuote(cep, 100), null, cep)
  }
})
test('free shipping starts at R$299 and recalculates when subtotal changes', () => {
  assert.equal(getShippingQuote('12345678', 298.99).cost, 19.9)
  assert.equal(getShippingQuote('12345678', 299).cost, 0)
  assert.equal(getShippingQuote('12345678', 299).total, 299)
  assert.equal(getShippingQuote('12345678', 100).cost, 19.9)
})
test('empty carts or invalid monetary amounts do not produce quotes', () => {
  for (const subtotal of [0, -1, Infinity, NaN]) assert.equal(getShippingQuote('12345678', subtotal), null)
})

test('the example CEP gives a quote without asking for customer details', () => {
  assert.equal(getShippingQuote(DEMO_SHIPPING_CEP, 298).total, 317.9)
  assert.equal(getShippingQuote(DEMO_SHIPPING_CEP, 300).total, 300)
})

test('CEP formatting round-trips pasted and unformatted values', () => {
  assert.equal(normalizeShippingCep(' 70040-010  '), '70040010')
  assert.equal(formatShippingCep('70040010'), '70040-010')
  assert.equal(normalizeShippingCep('70a40-010'), null)
  assert.equal(normalizeShippingCep('11111-111'), null)
})
