/* eslint-disable react/prop-types */

const FilmList = ({ films }) => {
  return (
    <ul className="films">
      {films.map((film) => (
        <li className="film" key={film.id}>
          <h3>{film.title}</h3>
          <p>{film.year}</p>
          <img src={film.poster} alt={film.title} />
        </li>
      ))}
    </ul>
  )
}

const NoFilmResult = () => {
  return <p>Films not found for this search</p>
}

export const Films = ({ films }) => {
  const hasFilms = films?.length > 0

  return hasFilms ? <FilmList films={films} /> : <NoFilmResult />
}
