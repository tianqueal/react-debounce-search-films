import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies.js'

export const useMovies = ({ search, sort }) => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(search)

  /**
   * useMemo para cualquier cosa, useCallback para funciones
   * useMemo prioriza valor
   */
  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return

    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  /* const getSortedMovies = (movies) => {
    const sortedMovies = sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
    return sortedMovies
  } */

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading, error }
}
