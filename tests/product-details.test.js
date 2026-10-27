import test from 'node:test'
import assert from 'node:assert/strict'
import { products } from '../src/data/products.js'
import { productDetails } from '../src/data/product-details.js'

test('every product provides composition, fit, care and measurements for its available sizes', () => {
  for (const product of products) {
    const detail = productDetails[product.id]
    assert.ok(detail, product.id)
    assert.ok(detail.composition.length > 0)
    assert.ok(detail.fit.length > 0)
    assert.ok(detail.care.length > 0)
    assert.deepEqual(detail.measurements.map(row => row[0]), product.sizes)
    assert.ok(detail.measurements.every(row => row.length === detail.columns.length))
    assert.ok(detail.measurements.every(row => row.slice(1).every(value => typeof value === 'number' && value > 0)))
  }
})
