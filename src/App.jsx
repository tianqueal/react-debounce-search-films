import './App.css'
/**
 * useRef hook que permite crear una referencia mutable
 * que persiste durante todo el ciclo de vida del componente
 * y no cambia el renderizado del componente
 */
import { useEffect, useState, useRef } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
/* import debounce from 'just-debounce-it' */

const useSearch = () => {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
    }

    setError(null)
  }, [search])
  return { search, updateSearch, error }
}

function App() {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  /* const debounceGetMovies = useCallback(
    debounce((search) => {
      console.log('search', search)
      getMovies({ search })
    }, 400),
    [getMovies]
  ) */

  const handleSubmit = (e) => {
    e.preventDefault()
    /* const { query } = Object.fromEntries(new window.FormData(e.target)) */
    /* const fields = new window.FormData(e.target)
    const query = fields.get('query') */
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (e) => {
    const newSearch = e.target.value
    updateSearch(newSearch)
    /* debounceGetMovies(newSearch) */
    getMovies({ search: newSearch })
  }

  return (
    <div className="page">
      <header>
        <h1>Buscador de películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={search}
            type="text"
            placeholder="Avengers, Star Wars, The Matrix..."
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
    </div>
  )
}

export default App
