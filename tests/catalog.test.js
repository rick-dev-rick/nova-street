import test from 'node:test'
import assert from 'node:assert/strict'
import { selectProducts } from '../src/lib/catalog.js'

const items = [
  { id: 'a', name: 'Tee', category: 'Unissex', price: 200, releasedAt: '2026-10-01' },
  { id: 'b', name: 'Cargo', category: 'Unissex', price: 100, releasedAt: '2026-10-20' },
  { id: 'c', name: 'Tee cropped', category: 'Feminino', price: 150, releasedAt: '2026-10-10' },
]

test('sorts numeric prices ascending without modifying the source catalog', () => {
  assert.deepEqual(selectProducts(items, { order: 'menor-preco' }).map(x => x.id), ['b', 'c', 'a'])
  assert.deepEqual(items.map(x => x.id), ['a', 'b', 'c'])
})
test('sorts numeric prices descending', () => {
  assert.deepEqual(selectProducts(items, { order: 'maior-preco' }).map(x => x.id), ['a', 'c', 'b'])
})
test('new arrivals follow release date rather than current array position', () => {
  assert.deepEqual(selectProducts(items, { order: 'novidades' }).map(x => x.id), ['b', 'c', 'a'])
})
test('combines category, trimmed case-insensitive search and ordering', () => {
  assert.deepEqual(selectProducts(items, { category: 'Unissex', query: ' TEE ', order: 'maior-preco' }).map(x => x.id), ['a'])
  assert.deepEqual(selectProducts(items, { category: 'Unissex', order: 'menor-preco' }).map(x => x.id), ['b', 'a'])
})
test('default and unknown orders preserve editorial order, including price ties', () => {
  assert.deepEqual(selectProducts(items), items)
  assert.deepEqual(selectProducts(items, { order: 'unknown' }), items)
  assert.deepEqual(selectProducts([{...items[0], price: 100}, items[1]], {order:'menor-preco'}).map(x => x.id), ['a','b'])
})
test('unmatched searches return an empty list', () => {
  assert.deepEqual(selectProducts(items, { query: 'missing', order: 'novidades' }), [])
})
