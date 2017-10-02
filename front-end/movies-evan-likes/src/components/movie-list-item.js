import React from 'react'

const MovieListItem = (props) => {
  const url = props.movie.url
  const movieTitle = props.movie.title
  const movieYear = props.movie.year

  return (
    <li>
      <a href={url}>
        {movieTitle}
      </a>
      { ' (' + movieYear + ')' }
    </li>
  )
}

export default MovieListItem