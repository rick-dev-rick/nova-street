import assert from 'node:assert/strict'
import test from 'node:test'
import { getMobileScrollProgress } from '../src/lib/mobile-scroll.js'

test('mobile scene progress follows the same position in either direction', () => {
  const track = { top: 1000, height: 400, from: .9, to: .2, anchor: 0 }
  const viewport = { height: 600, header: 100 }
  const positions = [400, 450, 625, 800, 900, 625, 450, 400]
  assert.deepEqual(positions.map(position => getMobileScrollProgress(track, viewport, position)), [
    0, 0, .5, 1, 1, .5, 0, 0,
  ])
})

test('a camera anchored to the bottom starts as the frame leaves the viewport', () => {
  const track = { top: 100, height: 600, from: .8, to: .2, anchor: 1 }
  const viewport = { height: 600, header: 100 }
  assert.equal(getMobileScrollProgress(track, viewport, 200), 0)
  assert.equal(getMobileScrollProgress(track, viewport, 350), .5)
  assert.equal(getMobileScrollProgress(track, viewport, 500), 1)
})
