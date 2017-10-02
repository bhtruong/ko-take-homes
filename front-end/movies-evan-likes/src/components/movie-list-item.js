import React from 'react'

const MovieListItem = (props) => {
  const url = props.movie.url
  const movieTitle = props.movie.title
  return (
    <li>
      <a href={url}>
        {movieTitle}
      </a>
    </li>
  )
}

export default MovieListItem