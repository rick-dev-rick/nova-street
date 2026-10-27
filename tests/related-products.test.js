import test from 'node:test'
import assert from 'node:assert/strict'
import { getRelatedProducts } from '../src/lib/related-products.js'

const current = { id: 'current', category: 'Unissex' }
const catalog = [current, {id:'other', category:'Feminino'}, {id:'same-1', category:'Unissex'}, {id:'extra', category:'Acessórios'}, {id:'same-2', category:'Unissex'}, {id:'last', category:'Masculino'}]

test('prioritizes matching categories, excludes the viewed item and returns at most four', () => {
  assert.deepEqual(getRelatedProducts(catalog, current).map(item => item.id), ['same-1','same-2','other','extra'])
  assert.deepEqual(catalog.map(item => item.id), ['current','other','same-1','extra','same-2','last'])
})
test('fills from other categories when no matching category is available', () => {
  assert.deepEqual(getRelatedProducts([catalog[1], current, catalog[3]], current).map(item => item.id), ['other','extra'])
})
test('a catalog with only the viewed product produces no recommendations', () => {
  assert.deepEqual(getRelatedProducts([current], current), [])
  assert.deepEqual(getRelatedProducts([], current), [])
})
