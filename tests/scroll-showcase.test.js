import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = path => readFileSync(new URL(`../src/${path}`, import.meta.url), 'utf8')

test('Home wires seven distinct scroll scenes to the existing editorial sequence', () => {
  const sceneNames = []
  for (const file of ['pages/Home.jsx', 'components/BestSellers.jsx', 'components/Lifestyle.jsx']) {
    sceneNames.push(...Array.from(read(file).matchAll(/data-scroll-scene="([^"]+)"/g), match => match[1]))
  }
  assert.deepEqual(sceneNames.sort(), ['best', 'drop', 'exit', 'explore', 'lifestyle', 'new', 'outro'])
  assert.match(read('pages/Home.jsx'), /import '\.\.\/styles\/scroll-showcase\.css'/)
})

test('scroll enhancement has stable anchors and a visible keyboard and reduced-motion fallback', () => {
  const css = read('styles/scroll-showcase.css')
  assert.match(css, /@media \(prefers-reduced-motion: no-preference\)/)
  assert.match(css, /@supports \(animation-timeline: view\(\)\)/)
  for (const timeline of ['hero', 'explore', 'new', 'drop', 'best', 'lifestyle', 'outro']) {
    assert.match(css, new RegExp(`animation-timeline: --scroll-${timeline}\\b`))
  }
  assert.match(css, /:focus-within/)
  assert.doesNotMatch(css, /(?:visibility:\s*hidden|opacity:\s*0\s*[;}])/)
})

test('the campaign pin uses a bounded CSS stage and semantic masked headlines', () => {
  const home = read('pages/Home.jsx')
  const css = read('styles/scroll-showcase.css')
  assert.match(home, /<div className="director-stage">/)
  assert.equal(home.match(/className="director-title-line"/g)?.length, 2)
  assert.match(css, /\.director-stage\s*\{[^}]*position:\s*sticky/)
  assert.match(css, /animation-range:\s*contain 0% contain 100%/)
  assert.match(css, /\(max-width: 600px\)[\s\S]*--director-/)
})
