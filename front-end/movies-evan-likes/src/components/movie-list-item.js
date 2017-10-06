import React from 'react'

const MovieListItem = (props) => {
  const movie = props.movie
  const url = movie.url
  const movieTitle = movie.title
  const movieId = movie.id
  const movieYear = movie.year
  const movieScore = movie.score * 100
  const coverURL = movie['cover-url']
  const reviews = props.reviews
  let review

  if (reviews.length) {
    //movie-id is equal to the array index + 1
    review = reviews[movieId - 1].review
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
        <img src={coverURL}/>
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