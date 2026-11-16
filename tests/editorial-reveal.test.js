import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { connectEditorialReveal } from '../src/lib/editorial-reveal.js'

function setup(saved = '', reduced = false) {
  const listeners = new Map()
  const target = id => ({
    dataset: { editorialReveal: id },
    closest: () => cards.get(id),
    contains: () => false,
  })
  const cards = new Map(['category', 'product', 'story'].map(id => [id, target(id)]))
  const observed = new Set()
  const mediaEvents = new Map()
  const media = {
    matches: reduced,
    addEventListener: (name, callback) => mediaEvents.set(name, callback),
    removeEventListener: name => mediaEvents.delete(name),
  }
  let notify
  let persisted = saved
  const view = {
    matchMedia: () => media,
    sessionStorage: {
      getItem: () => persisted || null,
      setItem: (_key, value) => { persisted = value },
    },
    IntersectionObserver: class {
      constructor(callback) { notify = callback }
      observe(card) { observed.add(card) }
      unobserve(card) { observed.delete(card) }
      disconnect() { observed.clear() }
    },
  }
  const root = {
    ownerDocument: { defaultView: view },
    querySelectorAll: () => [...cards.values()],
    contains: card => [...cards.values()].includes(card),
    addEventListener: (name, callback) => listeners.set(name, callback),
    removeEventListener: name => listeners.delete(name),
  }
  return { root, view, cards, observed, listeners, media, mediaEvents, getSaved: () => persisted,
    intersect: (id, isIntersecting) => notify([{ target: cards.get(id), isIntersecting }]) }
}

test('reveals once on entry and restores seen cards after route remount', () => {
  const f = setup()
  const disconnect = connectEditorialReveal(f.root)
  const category = f.cards.get('category')
  f.intersect('category', false)
  assert.equal(category.dataset.editorialEnter, undefined)
  f.intersect('category', true)
  assert.equal(category.dataset.editorialEnter, '')
  assert.equal(f.observed.has(category), false)
  delete category.dataset.editorialEnter
  f.intersect('category', false)
  f.intersect('category', true)
  assert.equal(category.dataset.editorialEnter, undefined)
  disconnect()
  assert.equal(f.observed.size, 0)
  assert.equal(f.listeners.size, 0)
  const returned = setup(f.getSaved())
  connectEditorialReveal(returned.root)
  assert.equal(returned.observed.has(returned.cards.get('category')), false)
  assert.equal(returned.observed.size, 2)
})

test('keyboard focus and reduced motion reveal immediately without a delayed animation', () => {
  const f = setup('', true)
  connectEditorialReveal(f.root)
  f.intersect('product', true)
  f.media.matches = false
  f.listeners.get('focusin')({ target: f.cards.get('story') })
  f.intersect('story', true)
  assert.equal(f.observed.size, 1)
  assert.equal(f.cards.get('product').dataset.editorialEnter, undefined)
  assert.equal(f.cards.get('story').dataset.editorialEnter, undefined)
  assert.deepEqual(JSON.parse(f.getSaved()), ['product', 'story'])
})

test('finish, focus and a preference change remove active animations without replay', () => {
  const f = setup()
  const disconnect = connectEditorialReveal(f.root)
  for (const id of f.cards.keys()) f.intersect(id, true)
  f.listeners.get('animationend')({ target: f.cards.get('category'), animationName: 'editorial-card-enter' })
  f.listeners.get('focusin')({ target: f.cards.get('product') })
  f.media.matches = true
  f.mediaEvents.get('change')()
  for (const card of f.cards.values()) assert.equal(card.dataset.editorialEnter, undefined)
  f.media.matches = false
  f.mediaEvents.get('change')()
  f.intersect('story', true)
  assert.equal(f.cards.get('story').dataset.editorialEnter, undefined)
  disconnect()
  assert.equal(f.mediaEvents.size, 0)
})

test('missing enhancements and blocked storage leave cards visible and usable', () => {
  const f = setup()
  const observer = f.view.IntersectionObserver
  delete f.view.IntersectionObserver
  assert.equal(connectEditorialReveal(f.root), undefined)
  assert.equal(f.observed.size, 0)
  f.view.IntersectionObserver = observer
  Object.defineProperty(f.view, 'sessionStorage', { get: () => { throw new Error('blocked') } })
  connectEditorialReveal(f.root)
  f.intersect('product', true)
  assert.equal(f.cards.get('product').dataset.editorialEnter, '')
})

test('the old scroll-driven card tracks and photo masks are absent', () => {
  const read = path => readFileSync(new URL(`../src/${path}`, import.meta.url), 'utf8')
  const mobile = read('lib/mobile-scroll.js')
  for (const scene of ['explore', 'new', 'lifestyle']) assert.doesNotMatch(mobile, new RegExp(`data-scroll-scene="${scene}"`))
  for (const stylesheet of ['scroll-showcase.css', 'mobile-scroll.css']) {
    assert.doesNotMatch(read(`styles/${stylesheet}`), /clip-path|product-image-wrap|lifestyle-card img/)
  }
})
