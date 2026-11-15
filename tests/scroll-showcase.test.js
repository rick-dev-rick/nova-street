import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = path => readFileSync(new URL(`../src/${path}`, import.meta.url), 'utf8')

test('Home wires the campaign cut and remaining scroll scenes to the existing editorial sequence', () => {
  const sceneNames = []
  for (const file of ['pages/Home.jsx', 'components/BestSellers.jsx', 'components/Lifestyle.jsx']) {
    sceneNames.push(...Array.from(read(file).matchAll(/data-scroll-scene="([^"]+)"/g), match => match[1]))
  }
  assert.deepEqual(sceneNames.sort(), ['best', 'cut', 'drop', 'exit', 'explore', 'lifestyle', 'new', 'outro'])
  assert.match(read('pages/Home.jsx'), /import '\.\.\/styles\/scroll-showcase\.css'/)
})

test('scroll enhancement has stable anchors and a visible keyboard and reduced-motion fallback', () => {
  const css = read('styles/scroll-showcase.css')
  assert.match(css, /@media \(prefers-reduced-motion: no-preference\)/)
  assert.match(css, /@supports \(animation-timeline: view\(\)\)/)
  for (const timeline of ['hero', 'explore', 'new', 'lifestyle', 'outro']) {
    assert.match(css, new RegExp(`animation-timeline: --scroll-${timeline}\\b`))
  }
  assert.match(css, /:focus-within/)
  assert.doesNotMatch(css, /(?:visibility:\s*hidden|opacity:\s*0\s*[;}])/)
})

test('the campaign keeps its title in the document flow and gives the camera cut no interactive surface', () => {
  const home = read('pages/Home.jsx')
  const campaign = read('styles/campaign-scroll.css')
  assert.match(home, /className="campaign-cut" data-scroll-scene="cut" aria-hidden="true"/)
  assert.equal(home.match(/className="director-title-line"/g)?.length, 2)
  assert.doesNotMatch(campaign, /position:\s*sticky/)
  assert.match(campaign, /\[data-campaign-motion\]/)
})
