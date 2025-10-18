import './App.css'
/**
 * useRef hook que permite crear una referencia mutable
 * que persiste durante todo el ciclo de vida del componente
 * y no cambia el renderizado del componente
 */
import { useState, useRef, useMemo, useCallback } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'

const useSearch = () => {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  const updateSearch = useCallback((newSearch) => {
    if (isFirstInput.current) {
      isFirstInput.current = newSearch === ''
      if (isFirstInput.current) {
        setError(null)
        setSearch(newSearch)
        return
      }
    }

    if (newSearch === '') {
      setError('No se puede buscar una película vacía')
    } else if (newSearch.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
    } else if (newSearch.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
    } else {
      setError(null)
    }
    setSearch(newSearch)
  }, [])

  return { search, updateSearch, error }
}

function App() {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debouncedGetMovies = useMemo(
    () => debounce(search => {
      getMovies({ search })
    }, 300)
    , [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div className="page">
      <header>
        <h1>Buscador de películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              style={{
                border: '1px solid transparent',
                borderColor: error ? 'red' : 'transparent',
              }}
              onChange={handleChange}
              value={search}
              name="query"
              placeholder="Avengers, Star Wars, The Matrix..."
            />
            <button type="submit">Buscar</button>
          </div>
          <div className="input-container">
            <label htmlFor="sort">Ordenar por título</label>
            <input type="checkbox" onChange={handleSort} checked={sort} />
          </div>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
    </div>
  )
}

export default App
