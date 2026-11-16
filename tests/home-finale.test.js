import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = path => readFileSync(new URL(`../src/${path}`, import.meta.url), 'utf8')

test('the editorial finale keeps a single semantic headline and its catalog link', () => {
  const component = read('components/FinalCTA.jsx')
  assert.match(component, /final-cta-visual" aria-hidden="true"/)
  assert.match(component, /<h2[^>]*>[\s\S]*Encontre seu estilo\.[\s\S]*Vista NØVA\.[\s\S]*<\/h2>/)
  assert.match(component, /<ActionLink variant="secondary" to="\/catalogo"/)
})

test('the finale is scroll-driven only when motion is suitable and supported', () => {
  const styles = read('styles/home-finale.css')
  assert.match(styles, /prefers-reduced-motion: no-preference/)
  assert.match(styles, /@supports \(animation-timeline: view\(\)\)/)
  assert.match(styles, /animation-timeline: --nova-finale/)
  assert.match(styles, /:focus-within/)
  assert.doesNotMatch(styles, /position:\s*(?:fixed|sticky)/)
})
