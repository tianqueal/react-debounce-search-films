import { useRef, useState, useMemo, useCallback } from 'react'
import { searchFilms } from '../services/films.js'

export const useFilms = ({ search, sort }) => {
  const [films, setFilms] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(search)

  /**
   * useMemo is for memoizing values, and useCallback is for memoizing functions.
   * useMemo prioritises the value.
   */
  const getFilms = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return

    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newFilms = await searchFilms({ search })
      setFilms(newFilms)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  /* const getSortedFilms = (films) => {
    const sortedFilms = sort
      ? [...films].sort((a, b) => a.title.localeCompare(b.title))
      : films
    return sortedFilms
  } */

  const sortedFilms = useMemo(() => {
    return sort
      ? [...films].sort((a, b) => a.title.localeCompare(b.title))
      : films
  }, [sort, films])

  return { films: sortedFilms, getFilms, loading, error }
}
