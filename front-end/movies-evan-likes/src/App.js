import React, { Component } from 'react'
import MovieList from './components/movie-list'

/*
 * converted App to a class based component to take advantage
 * of component level state.
 */
class App extends Component {
  constructor(prop) {
    super(prop);

    let storedMovies, storedReviews

    if (storageAvailable('localStorage')) {
      storedMovies = window['localStorage'].getItem('movies')
      storedReviews = window['localStorage'].getItem('reviews')
    }

    storedMovies = JSON.parse(storedMovies) || []
    storedReviews = JSON.parse(storedReviews) || []

    this.state = { movies: storedMovies }

    if (!storedMovies.length) {
      getJSON('/movies', (movies) => { 
        //parse JSON string to object and sort by title
        let movieList = JSON.parse(movies).sort((a, b) => {
          if (a.title < b.title) { return -1 }
          if (a.title > b.title) { return 1 }
          return 0
        })

        this.setState({
          movies: movieList
        })

        if (storageAvailable('localStorage')) {
          window['localStorage'].setItem('movies', JSON.stringify(movieList))
        }
      })
    }

    if (!storedReviews.length) {
      getJSON('reviews', (reviews) => {
        if (storageAvailable('localStorage')) {
          window['localStorage'].setItem('reviews', JSON.stringify(reviews))
        }
      })
    }
  }

  render() {
    return (
      <div className='page'>
        <div className='app-description'>
          <h1 className='app-description__title'>Movies Evan Likes!</h1>
          <p className='app-description__content'>
            Below is a (not) comprehensive list of movies that Evan really
            likes.
          </p>
          <MovieList movies={this.state.movies}/>
        </div>
      </div>
    )
  }
}

//taken from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
function getJSON(url, callback) {
  let xhr = new XMLHttpRequest()
  xhr.onload = function() {
    callback(this.responseText)
  }
  xhr.open('GET', url, true) //asynchronous
  xhr.send()
}

//taken from: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
  try {
    var storage = window[type],
      x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  }
  catch(e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0
  }
}

export default App
