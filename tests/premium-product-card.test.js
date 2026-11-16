import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = path => readFileSync(new URL(`../src/${path}`, import.meta.url), 'utf8')

test('the interaction plane wraps the scroll-driven photograph beside an independent favorite', () => {
  const card = read('components/ProductCard.jsx')
  assert.match(card, /<Link[^>]+product-image-wrap[^>]*>\s*<span className="product-image-plane">\s*<img/)
  assert.match(card, /<\/Link>\s*<FavoriteButton product=\{product\}/)
  assert.match(card, /<strong className="price">\{money\.format\(product\.price\)\}/)
  assert.match(card, /product-image-cue" aria-hidden="true"/)
  assert.match(card, /onPointerCancel: endTouchPress/)
  assert.doesNotMatch(card, /preventDefault/)
})

test('the zoom applies to its own plane and listens to keyboard, mouse and press', () => {
  const css = read('styles/premium-product-card.css')
  assert.match(css, /\.product-image-plane\s*\{[^}]*transform:/s)
  assert.match(css, /hover: hover\) and \(pointer: fine/)
  for (const cue of [':focus-visible', ':active', '[data-touch-pressed]', 'prefers-reduced-motion: no-preference']) {
    assert.ok(css.includes(cue))
  }
  assert.doesNotMatch(css, /\.product-image-plane img\s*\{[^}]*transform:/s)
})
