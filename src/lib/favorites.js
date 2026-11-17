import { products } from '../data/products.js'
import { readStoredArray } from './read-stored-array.js'

const STORAGE_KEY = 'nova-street:favorites:v1'
const knownIds = new Set(products.map(product => product.id))

export function toggleFavorite(favorites, id) {
  if (!knownIds.has(id)) return favorites
  return favorites.includes(id) ? favorites.filter(item => item !== id) : [...favorites, id]
}

export function loadFavorites(storage) {
  const entries = readStoredArray(STORAGE_KEY, storage)
  return entries === null ? null : [...new Set(entries.filter(id => knownIds.has(id)))]
}

export function saveFavorites(favorites, storage) {
  try {
    ;(storage ?? window.localStorage).setItem(STORAGE_KEY, JSON.stringify(favorites))
    return true
  } catch {
    return false
  }
}
