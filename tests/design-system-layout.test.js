import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
const tokens = read('src/design-system/tokens.css')
const app = read('src/styles/app.css')

function token(name) {
  return tokens.match(new RegExp(`^  --nova-${name}: ([^;]+);`, 'm'))?.[1]
}

test('storefront spacing and container use shared tokens', () => {
  assert.equal(token('container-max'), '1180px')
  assert.equal(token('container-gutter'), 'var(--nova-space-5)')
  assert.match(app, /\.container\{[^}]*var\(--nova-container-max\)[^}]*var\(--nova-container-gutter\)/)
  assert.equal([...app.matchAll(/(?:margin|padding|gap)(?:-[\w-]+)?:\s*(?:[1-9]\d*px)/g)].length, 0)
})

test('breakpoint rules are centralized and share the same grid tracks', () => {
  const widths = [...app.matchAll(/@media\s*\(max-width:\s*(\d+)px\)/g)].map(([, value]) => Number(value))
  assert.deepEqual(widths, [1200, 900, 600])
  assert.match(app, /\.form-grid\{\s*--grid-gap:var\(--nova-grid-gap\);\s*display:grid;/)
  assert.match(app, /\.product-grid\{[^}]*repeat\(4,minmax\(0,1fr\)\)/)
  assert.match(app, /\.product-grid\{[^}]*repeat\(2,minmax\(0,1fr\)\)/)
})

test('geometry roles are applied to media, controls and dialogs', () => {
  assert.equal(token('ratio-product'), '4 / 5')
  assert.equal(token('control-min'), '44px')
  for (const role of ['ratio-product', 'ratio-editorial', 'ratio-editorial-wide',
    'border-width', 'radius-none', 'radius-pill', 'shadow-control', 'shadow-dialog', 'shadow-photo-focus']) {
    assert.ok(token(role), `Missing geometry role: ${role}`)
    assert.ok(app.includes(`var(--nova-${role})`), `Unused geometry role: ${role}`)
  }
})
