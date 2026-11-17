import assert from 'node:assert/strict'
import test from 'node:test'
import { isPlainProductActivation, startProductFlight } from '../src/lib/product-flight.js'

const activation = { button: 0, currentTarget: { target: '' } }

test('only an ordinary current-tab product link can start a flight', () => {
  assert.equal(isPlainProductActivation(activation), true)
  for (const flag of ['defaultPrevented', 'metaKey', 'ctrlKey', 'altKey', 'shiftKey']) {
    assert.equal(isPlainProductActivation({ ...activation, [flag]: true }), false)
  }
  assert.equal(isPlainProductActivation({ ...activation, button: 1 }), false)
  assert.equal(isPlainProductActivation({ ...activation, currentTarget: { target: '_blank' } }), false)
})

function flight(t) {
  const attributes = new Set()
  let update
  const win = new EventTarget()
  Object.assign(win, {
    innerHeight: 800, location: { href: '/catalogo' }, history: { state: { key: 'origin' } },
    matchMedia: () => ({ matches: true }), scrollTo() {},
  })
  const doc = new EventTarget()
  Object.assign(doc, {
    documentElement: {
      setAttribute(name) { attributes.add(name) },
      removeAttribute(name) { attributes.delete(name) },
    },
    querySelector: () => null,
    startViewTransition(callback) {
      update = callback
      return { ready: Promise.resolve(), finished: new Promise(() => {}), skipTransition() {} }
    },
  })
  for (const [name, value] of [['window', win], ['document', doc]]) {
    const previous = Object.getOwnPropertyDescriptor(globalThis, name)
    Object.defineProperty(globalThis, name, { configurable: true, value })
    t.after(() => {
      if (previous) Object.defineProperty(globalThis, name, previous)
      else delete globalThis[name]
    })
  }

  const style = { removeProperty() { this.viewTransitionName = '' } }
  const frame = {
    style,
    querySelector: () => ({ complete: true, naturalWidth: 100 }),
    getBoundingClientRect: () => ({ width: 300, height: 300, top: 100, bottom: 400 }),
  }
  const visited = []
  const event = { ...activation, preventDefault() { this.defaultPrevented = true } }
  startProductFlight(event, { frame, to: '/produto/peça', navigate: (...args) => visited.push(args) })
  assert.equal(event.defaultPrevented, true)
  return { doc, win, update, attributes, visited, style }
}

test('interrupting the animation before its update preserves the accepted product link', t => {
  const f = flight(t)
  f.doc.dispatchEvent(new Event('wheel'))
  assert.equal(f.attributes.has('data-product-flight'), false)
  assert.equal(f.style.viewTransitionName, '')
  f.update()
  assert.deepEqual(f.visited, [['/produto/peça']])
})

test('history wins over a queued product navigation', t => {
  const f = flight(t)
  f.win.dispatchEvent(new Event('popstate'))
  f.update()
  assert.deepEqual(f.visited, [])
})
