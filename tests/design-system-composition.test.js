import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = path => readFileSync(new URL(`../src/${path}`, import.meta.url), 'utf8')

test('home puts the lead action and promotion before the editorial sections', () => {
  const home = read('pages/Home.jsx')
  assert.equal(home.match(/<ActionLink variant="primary"/g)?.length, 1)
  assert.ok(home.indexOf('className="hero"') < home.indexOf('className="promo-strip"'))
  assert.ok(home.indexOf('className="promo-strip"') < home.indexOf('className="category-grid"'))
  assert.match(read('components/FinalCTA.jsx'), /<ActionLink variant="secondary"/)
})

test('product and checkout identify and group the information around their primary actions', () => {
  assert.match(read('pages/Product.jsx'), /className="product-purchase"[\s\S]+aria-describedby="purchase-help"/)
  const checkout = read('pages/Checkout.jsx')
  assert.ok(checkout.indexOf('<h1>Finalizar pedido</h1>') < checkout.indexOf('className="checkout-notice'))
  assert.match(checkout, /<h2[^>]*>Dados do pedido<\/h2>/)
  assert.match(checkout, /<h2[^>]*>Resumo e frete<\/h2>/)
})

test('empty catalog provides a recovery action without duplicating favorites actions', () => {
  const catalog = read('pages/Catalog.jsx')
  assert.match(catalog, /<EmptyState[\s\S]+onClick=\{clearFilters\}/)
  assert.match(catalog, /function clearFilters\(\)\s*\{\s*setQuery\(''\)\s*chooseCategory\('Todos'\)/)
  assert.match(read('pages/Favorites.jsx'), /\{saved\.length > 0 && <ActionLink/)
})
