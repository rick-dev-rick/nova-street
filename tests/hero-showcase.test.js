import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const home = readFileSync(new URL('../src/pages/Home.jsx', import.meta.url), 'utf8')
const motion = () => readFileSync(new URL('../src/styles/hero-showcase.css', import.meta.url), 'utf8')

test('hero keeps one headline and an immediately available catalog link', () => {
  assert.match(home, /<h1 className="hero-display"[^>]*>/)
  assert.deepEqual([...home.matchAll(/className="hero-display-line"><span>([^<]+)/g)].map(match => match[1]), [
    'NEW DROP', 'STREET', 'ESSENTIALS',
  ])
  assert.match(home, /<ActionLink variant="primary" className="hero-action" to="\/catalogo">/)
  assert.match(home, /<\/section>\s*<aside className="promo-strip"/)
})

test('hero motion is opt-in, scoped and keeps the final state available for keyboard focus', () => {
  const css = motion()
  assert.match(css, /@media \(prefers-reduced-motion: no-preference\)/)
  assert.match(css, /\.hero:focus-within/)
  assert.match(css, /@keyframes nova-hero-camera/)
  assert.match(css, /@keyframes nova-hero-shutter/)
  assert.match(css, /@keyframes nova-hero-type/)
  assert.doesNotMatch(css, /\binfinite\b/)
})
