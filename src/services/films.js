const API_KEY = import.meta.env.VITE_API_KEY

export const searchFilms = async ({ search }) => {
  if (search === '') return null

  try {
    /* const queryParams = new URLSearchParams({ apikey: API_KEY, s: search }) */
    const response = await fetch(encodeURI(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`))
    const json = await response.json()

    const films = json.Search

    return films?.map(film => ({
      id: film.imdbID,
      title: film.Title,
      year: film.Year,
      poster: film.Poster
    }))
  } catch (error) {
    console.error(error)
    throw new Error('Error searching films')
  }
}
