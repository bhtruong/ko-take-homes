import React from 'react'

const MovieListItem = (props) => {
  const url = props.movie.url
  const movieTitle = props.movie.title
  const movieId = props.movie.id
  const movieYear = props.movie.year
  const movieScore = props.movie.score * 100
  const reviews = props.reviews
  let review

  if (reviews.length) {
    //movie-id is equal to the array index + 1
    review = props.reviews[movieId - 1].review
  }

  return (
    <li
      id={movieId}
      onClick={handleEvent}>
      { movieScore + '% '}
      <a href={url} onClick={(event) => {event.stopPropagation()}}>
        {movieTitle}
      </a>
      { ' (' + movieYear + ')' }
      <p className="hidden">
        {review}
      </p>
    </li>
  )
}

function handleEvent(event) {
  let listItem = event.target
  let review = event.target.lastChild

  if (review.className === 'hidden') {
    review.className = 'active'
    listItem.className = 'review-active'
  } else {
    review.className = 'hidden'
    listItem.className = ''
  }
}

export default MovieListItem