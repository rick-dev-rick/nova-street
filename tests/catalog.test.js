import test from 'node:test'
import assert from 'node:assert/strict'
import { parseCatalogParams, selectProducts, updateCatalogParams } from '../src/lib/catalog.js'

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


test('reads catalog refinements from the URL and falls back for unsupported values', () => {
  const categories = ['Todos', 'Acessórios', 'Unissex']
  assert.deepEqual(
    parseCatalogParams(new URLSearchParams('categoria=Acess%C3%B3rios&busca=bon%C3%A9&ordem=menor-preco'), categories),
    { category: 'Acessórios', query: 'boné', order: 'menor-preco' },
  )
  assert.deepEqual(
    parseCatalogParams(new URLSearchParams('categoria=404&ordem=unknown'), categories),
    { category: 'Todos', query: '', order: 'destaques' },
  )
})

test('changes one query refinement without dropping other refinements or mutating URL parameters', () => {
  const current = new URLSearchParams('categoria=Unissex&ordem=maior-preco&origem=home')
  const next = updateCatalogParams(current, { query: ' Têe ' })
  assert.equal(next.get('busca'), ' Têe ')
  assert.equal(next.get('categoria'), 'Unissex')
  assert.equal(next.get('ordem'), 'maior-preco')
  assert.equal(next.get('origem'), 'home')
  assert.equal(current.has('busca'), false)
})

test('reset removes all catalog refinements while keeping unrelated URL parameters', () => {
  const current = new URLSearchParams('categoria=Unissex&ordem=maior-preco&busca=moletom&origem=home')
  assert.equal(updateCatalogParams(current, { category: 'Todos', query: '', order: 'destaques' }).toString(), 'origem=home')
})

test('searches by catalog terms regardless of accents, letter case or token order', () => {
  const products = [
    { id: 'crop', name: 'Nøva Cropped Tee', category: 'Feminino', description: 'Cropped de corte reto.' },
    { id: 'cap', name: 'Urban Cap Redline', category: 'Acessórios', description: 'Boné estruturado.' },
  ]
  assert.deepEqual(selectProducts(products, { query: 'cropped NOVA' }).map(x => x.id), ['crop'])
  assert.deepEqual(selectProducts(products, { query: 'BONE acessorio' }).map(x => x.id), ['cap'])
  assert.deepEqual(selectProducts(products, { category: 'Feminino', query: 'boné' }), [])
})
