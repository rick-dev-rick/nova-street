import { useEffect, useState } from 'react'

export function useStoredList(load, save) {
  const [initial] = useState(load)
  const [items, setItems] = useState(() => initial ?? [])

  useEffect(() => {
    // Skip hydration writes and keep the session in memory if the prior data was unreadable.
    if (initial !== null && items !== initial) save(items)
  }, [initial, items, save])

  return [items, setItems]
}
