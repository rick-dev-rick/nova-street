import assert from 'node:assert/strict'
import test from 'node:test'
import { observeProductLink } from '../src/lib/product-route.js'

test('a queued entry for a removed card cannot disconnect the remaining targets', t => {
  const instances = []
  class Observer {
    constructor(notify) {
      this.notify = notify
      this.targets = new Set()
      this.disconnects = 0
      instances.push(this)
    }
    observe(target) { this.targets.add(target) }
    unobserve(target) { this.targets.delete(target) }
    disconnect() { this.disconnects++; this.targets.clear() }
  }
  t.mock.method(Observer.prototype, 'observe')
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { IntersectionObserver: Observer } })
  Object.defineProperty(globalThis, 'IntersectionObserver', { configurable: true, value: Observer })
  t.after(() => { delete globalThis.window; delete globalThis.IntersectionObserver })

  const removed = {}
  const remaining = {}
  const removeFirst = observeProductLink(removed)
  const removeLast = observeProductLink(remaining)
  removeFirst()
  instances[0].notify([{ target: removed, isIntersecting: true }])
  assert.deepEqual([...instances[0].targets], [remaining])
  removeLast()
  assert.equal(instances[0].disconnects, 1)
})
