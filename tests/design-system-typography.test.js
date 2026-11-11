import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
const tokens = read('src/design-system/tokens.css')
const app = read('src/styles/app.css')

function token(name) {
  return tokens.match(new RegExp(`^  --nova-${name}: ([^;]+);`, 'm'))?.[1]
}

test('typography has a fluid heading scale and scalable sizes for everyday text', () => {
  for (const role of ['display', 'h1', 'h2', 'h3']) {
    const value = token(`type-size-${role}`)
    assert.match(value ?? '', /^clamp\([\d.]+rem, .+rem \+ .+vw, [\d.]+rem\)$/)
  }
  for (const role of ['h4', 'h5', 'h6', 'body', 'label', 'caption', 'price']) {
    assert.match(token(`type-size-${role}`) ?? '', /^[\d.]+rem$/)
  }
  assert.equal(token('type-leading-body'), '1.6')
})

test('storefront imports the shared typography rules and uses semantic type tokens', () => {
  assert.match(app, /@import ['"]\.\.\/design-system\/typography\.css['"]/)
  const typography = read('src/design-system/typography.css')
  assert.match(typography, /font-display:\s*swap/)
  assert.match(typography, /inter-latin-wght-normal\.woff2/)
  for (let level = 1; level <= 6; level++) {
    assert.match(typography, new RegExp(`h${level}\\s*\\{[^}]*var\\(--nova-type-size-h${level}\\)`))
  }
  assert.match(typography, /\.price\s*\{[^}]*font-variant-numeric:\s*lining-nums tabular-nums/)
  assert.match(typography, /overflow-wrap:\s*anywhere/)
  assert.doesNotMatch(app, /(?:font-size|font-weight|line-height|letter-spacing):\s*(?:clamp\(|[-.\d])/)
})
