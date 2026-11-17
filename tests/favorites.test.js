import test from 'node:test'
import assert from 'node:assert/strict'
import { products } from '../src/data/products.js'
import { toggleFavorite, loadFavorites, saveFavorites } from '../src/lib/favorites.js'

const id = products[0].id
function memoryStorage(initial = null) {
  let value = initial
  return { getItem: () => value, setItem: (_, next) => { value = next } }
}

test('toggles a known product without mutating the previous selection', () => {
  const previous = []
  const next = toggleFavorite(previous, id)
  assert.deepEqual(next, [id])
  assert.deepEqual(previous, [])
  assert.deepEqual(toggleFavorite(next, id), [])
})
test('ignores products absent from the catalog', () => {
  assert.deepEqual(toggleFavorite([id], 'missing'), [id])
})
test('restores saved favorites after reopening and persists removal', () => {
  const storage = memoryStorage()
  saveFavorites([id], storage)
  assert.deepEqual(loadFavorites(storage), [id])
  saveFavorites([], storage)
  assert.deepEqual(loadFavorites(storage), [])
})
test('restores only unique current product IDs from untrusted stored data', () => {
  const storage = memoryStorage(JSON.stringify([id, id, 'missing', null, 1, {id}]))
  assert.deepEqual(loadFavorites(storage), [id])
})
test('malformed or unavailable storage cannot crash the storefront', () => {
  assert.deepEqual(loadFavorites(memoryStorage('{')), [])
  assert.deepEqual(loadFavorites(memoryStorage('{}')), [])
  const blocked = { getItem() { throw new Error('blocked') }, setItem() { throw new Error('quota') } }
  assert.equal(loadFavorites(blocked), null)
  assert.doesNotThrow(() => saveFavorites([id], blocked))
})

test('a write failure leaves the previous saved collection readable', () => {
  const retained = memoryStorage(JSON.stringify([id]))
  const blocked = { getItem: retained.getItem, setItem() { throw Error('quota') } }
  const items = loadFavorites(blocked)
  assert.equal(items.length, 1)
  assert.equal(saveFavorites([], blocked), false)
  assert.deepEqual(loadFavorites(retained), items)
})
