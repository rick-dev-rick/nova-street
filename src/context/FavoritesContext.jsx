import { createContext, useContext, useEffect, useState } from 'react'
import { loadFavorites, saveFavorites, toggleFavorite } from '../lib/favorites.js'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => loadFavorites())
  useEffect(() => { saveFavorites(favorites) }, [favorites])

  function toggle(id) {
    setFavorites(current => toggleFavorite(current, id))
  }

  return <FavoritesContext.Provider value={{ favorites, toggle }}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  return useContext(FavoritesContext)
}
