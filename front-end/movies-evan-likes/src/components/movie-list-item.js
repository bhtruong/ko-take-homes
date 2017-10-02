import React from 'react'

const MovieListItem = (props) => {
  return (
    <li>
      {props.movie.title}
    </li>
  )
}

export default MovieListItem