import React from 'react'

import MovieListItem from './movie-list-item'

const MovieList = (props) => {
  const reviews = props.reviews
  const movieListItems = props.movies.map((movie) => {
    return (
      <MovieListItem
        key={movie.id}
        movie={movie}
        reviews={reviews}/>
    )
  })

  return (
    <ul>
      {movieListItems}
    </ul>
  )
}

export default MovieList