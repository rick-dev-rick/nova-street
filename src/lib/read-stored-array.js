// A blocked read must not be treated as proof that the saved collection was empty.
export function readStoredArray(key, storage) {
  let raw
  try {
    raw = (storage ?? window.localStorage).getItem(key)
  } catch {
    return null
  }

  try {
    const value = JSON.parse(raw ?? '[]')
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}
