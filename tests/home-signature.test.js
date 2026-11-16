import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = path => readFileSync(new URL(`../src/${path}`, import.meta.url), 'utf8')

test('the Home signature follows the last call to action and precedes the shared footer', () => {
  const home = read('pages/Home.jsx')
  const signature = read('components/HomeSignature.jsx')
  const layout = read('components/Layout.jsx')

  assert.match(home, /<FinalCTA\s*\/>[\s\S]*<HomeSignature\s*\/>/)
  assert.match(layout, /<\/main>\s*<Footer\s*\/>/)
  assert.match(signature, /<h2[^>]*>[\s\S]*NØVA[\s\S]*STREET[\s\S]*<\/h2>/)
  assert.match(signature, /className="home-signature-depth" aria-hidden="true"/)
})

test('the signature enables view-driven motion only when supported and requested', () => {
  const styles = read('styles/home-signature.css')

  assert.match(styles, /@media \(prefers-reduced-motion: no-preference\)\s*\{/)
  assert.match(styles, /@supports \(animation-timeline: view\(\)\)/)
  assert.match(styles, /animation-timeline: --nova-signature/)
  assert.doesNotMatch(styles, /position:\s*(?:fixed|sticky)/)
})
