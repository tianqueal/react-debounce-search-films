import './App.css'
/**
 * useRef is a hook that allows you to create a mutable reference
 * that persists throughout the component's lifecycle
 * and does not trigger a re-render when its value changes.
 */
import { useState, useRef, useMemo, useCallback } from 'react'
import { Films } from './components/Films'
import { useFilms } from './hooks/useFilms'
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
      setError('You cannot search for an empty film')
    } else if (newSearch.match(/^\d+$/)) {
      setError('You cannot search for a film with a number')
    } else if (newSearch.length < 3) {
      setError('The search must have at least 3 characters')
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
  const { films, getFilms, loading } = useFilms({ search, sort })

  const debouncedGetFilms = useMemo(
    () => debounce(search => {
      getFilms({ search })
    }, 300)
    , [getFilms]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getFilms({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetFilms(newSearch)
  }

  return (
    <div className="page">
      <header>
        <h1>Film Search</h1>
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
            <button type="submit">Search</button>
          </div>
          <div className="input-container">
            <label htmlFor="sort">Sort by title</label>
            <input type="checkbox" onChange={handleSort} checked={sort} />
          </div>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>{loading ? <p>Loading...</p> : <Films films={films} />}</main>
    </div>
  )
}

export default App
