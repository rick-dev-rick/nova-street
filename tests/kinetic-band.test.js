import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const readSource = path => readFileSync(new URL(path, import.meta.url), 'utf8')

test('the kinetic band bridges Lifestyle and the final call on Home', () => {
  const home = readSource('../src/pages/Home.jsx')
  assert.match(home, /<Lifestyle \/>\s*<KineticBand \/>\s*<div className="home-finale"/)
})

test('the kinetic band progressively enhances static copy with finite view-driven motion', () => {
  const band = readSource('../src/components/KineticBand.jsx')
  const styles = readSource('../src/styles/kinetic-band.css')

  for (const phrase of ['NO RULES.', 'JUST STREET.', 'NØVA STREET', 'MOVE DIFFERENT.']) {
    assert.equal(band.split(phrase).length - 1, 1, phrase)
  }
  assert.match(styles, /@media \(prefers-reduced-motion: no-preference\)/)
  assert.match(styles, /@supports .*animation-timeline.*animation-range/)
  assert.match(styles, /animation-timeline: --kinetic-band/)
  assert.doesNotMatch(styles, /\binfinite\b/)
})
