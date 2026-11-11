import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = path => readFileSync(new URL(`../src/${path}`, import.meta.url), 'utf8')

test('motion is shared and uses the design tokens', () => {
  assert.match(read('styles/app.css'), /@import ['"]\.\.\/design-system\/motion\.css['"]/)
  const css = read('design-system/motion.css')
  for (const token of ['fast', 'normal', 'slow']) assert.ok(css.includes(`var(--nova-motion-${token})`))
  assert.match(css, /var\(--nova-ease-standard\)/)
  assert.doesNotMatch(css, /\b\d+(?:\.\d+)?(?:ms|s)\b/)
})

test('menu and dialogs animate as their visibility changes', () => {
  const css = read('design-system/motion.css')
  assert.match(css, /@starting-style/)
  assert.match(css, /display var\(--nova-motion-normal\) allow-discrete/)
  assert.match(css, /overlay var\(--nova-motion-normal\) allow-discrete/)
  assert.match(read('components/CategoryNavigation.jsx'), /inert=\{isMobile && !open\}/)
})

test('reduced motion removes transitions and animations from the motion rules', () => {
  assert.match(read('design-system/motion.css'), /prefers-reduced-motion:\s*reduce[\s\S]+transition:\s*none[\s\S]+animation:\s*none/)
  assert.match(read('components/Layout.jsx'), /className="route-view" key=\{pathname\}/)
})
