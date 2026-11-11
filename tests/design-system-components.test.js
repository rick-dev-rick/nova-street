import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = path => readFileSync(new URL(`../src/${path}`, import.meta.url), 'utf8')

test('purchase and catalog use shared action, field and selection components', () => {
  assert.match(read('pages/Product.jsx'), /<Button[^>]*aria-describedby="purchase-help"/)
  assert.match(read('pages/Product.jsx'), /<ChoiceButton[^>]*selected=/)
  assert.match(read('pages/Catalog.jsx'), /<InputField[^>]*type="search"/)
  assert.match(read('pages/Catalog.jsx'), /<SelectField[^>]*label="Ordenar por"/)
})

test('overlays share a native dialog and shipping uses feedback variants', () => {
  assert.match(read('components/CartDrawer.jsx'), /<Dialog\b/)
  assert.match(read('components/ProductGallery.jsx'), /<Dialog\b/)
  assert.match(read('components/ShippingCalculator.jsx'), /<Feedback[^>]*tone="error"/)
  assert.match(read('components/ShippingCalculator.jsx'), /<Feedback[^>]*tone="success"/)
})

test('route loader, responsive menu, editorial cards and size table are wired to real screens', () => {
  assert.match(read('App.jsx'), /lazy\(\(\) => import\('\.\/pages\/Catalog\.jsx'\)\)/)
  assert.match(read('components/Layout.jsx'), /<Suspense fallback=\{<LoadingStatus \/>\}>/)
  assert.match(read('components/Header.jsx'), /<CategoryNavigation\b/)
  assert.match(read('pages/Home.jsx'), /<EditorialCard[^>]*variant="category"/)
  assert.match(read('components/Lifestyle.jsx'), /<EditorialCard[^>]*variant="story"/)
  assert.match(read('components/ProductInformation.jsx'), /<SizeTable\b/)
})
