import assert from 'node:assert/strict'
import test from 'node:test'
import { isPlainProductActivation } from '../src/lib/product-flight.js'

const activation = { button: 0, currentTarget: { target: '' } }

test('only an ordinary current-tab product link can start a flight', () => {
  assert.equal(isPlainProductActivation(activation), true)
  for (const flag of ['defaultPrevented', 'metaKey', 'ctrlKey', 'altKey', 'shiftKey']) {
    assert.equal(isPlainProductActivation({ ...activation, [flag]: true }), false)
  }
  assert.equal(isPlainProductActivation({ ...activation, button: 1 }), false)
  assert.equal(isPlainProductActivation({ ...activation, currentTarget: { target: '_blank' } }), false)
})
