import { createContext, useContext } from 'react'
import { useStoredList } from '../hooks/useStoredList.js'
import { loadFavorites, saveFavorites, toggleFavorite } from '../lib/favorites.js'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useStoredList(loadFavorites, saveFavorites)

  function toggle(id) {
    setFavorites(current => toggleFavorite(current, id))
  }

  return <FavoritesContext.Provider value={{ favorites, toggle }}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  return useContext(FavoritesContext)
}
