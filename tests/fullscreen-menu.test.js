import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = path => readFileSync(new URL(`../src/${path}`, import.meta.url), 'utf8')

test('category navigation opens a native modal and keeps links native', () => {
  const nav = read('components/CategoryNavigation.jsx')
  assert.match(nav, /import Dialog/)
  assert.match(nav, /\.showModal\(\)/)
  assert.match(nav, /aria-haspopup="dialog"/)
  assert.match(nav, /onCancel=/)
  assert.match(nav, /\.focus\(\{ preventScroll: true \}\)/)
  assert.match(nav, /onClick=\{followLink\}/)
})

test('the fullscreen sheet accounts for the viewport and protects background scrolling', () => {
  const css = read('styles/fullscreen-menu.css')
  assert.match(css, /100dvh/)
  assert.match(css, /safe-area-inset-top/)
  assert.match(css, /:root:has\(\.cinematic-menu\[open\]\)/)
  assert.match(css, /prefers-reduced-motion: no-preference/)
})
