import { products } from '../data/products.js'

const STORAGE_KEY = 'nova-street:favorites:v1'
const knownIds = new Set(products.map(product => product.id))

export function toggleFavorite(favorites, id) {
  if (!knownIds.has(id)) return favorites
  return favorites.includes(id) ? favorites.filter(item => item !== id) : [...favorites, id]
}

export function loadFavorites(storage) {
  try {
    const entries = JSON.parse((storage ?? window.localStorage).getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(entries) ? [...new Set(entries.filter(id => knownIds.has(id)))] : []
  } catch {
    return []
  }
}

export function saveFavorites(favorites, storage) {
  try {
    ;(storage ?? window.localStorage).setItem(STORAGE_KEY, JSON.stringify(favorites))
    return true
  } catch {
    return false
  }
}
