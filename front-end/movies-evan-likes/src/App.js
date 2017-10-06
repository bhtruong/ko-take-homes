import React, { Component } from 'react'

import MovieList from './components/movie-list'
import SearchBar from './components/search-bar'
import Dropdown from './components/dropdown'

/*
 * converted App to a class based component to take advantage
 * of component level state.
 */
class App extends Component {
  constructor(prop) {
    super(prop)

    this.searchByTitle = this.searchByTitle.bind(this)
    this.selectDecade = this.selectDecade.bind(this)

    let storedMovies, storedReviews, storedDecades;

    if (storageAvailable('localStorage')) {
      storedMovies = window['localStorage'].getItem('movies')
      storedReviews = window['localStorage'].getItem('reviews')
      storedDecades = window['localStorage'].getItem('decades')
    }

    storedMovies = JSON.parse(storedMovies) || []
    storedReviews = JSON.parse(storedReviews) || []
    storedDecades = JSON.parse(storedDecades) || []

    // console.log(storedMovies)
    // console.log(storedReviews)
    // console.log(storedDecades)

    this.state = { 
      movies: storedMovies,
      reviews: storedReviews, 
      filteredMovies: storedMovies,
      decades: storedDecades
    }

    if (!storedMovies.length) {
      getJSON('/movies', (movies) => {
        movies = JSON.parse(movies)

        //sort movies by title
        let movieList = movies.sort((a, b) => {
          if (a.title < b.title) { return -1 }
          if (a.title > b.title) { return 1 }
          return 0
        })

        //find the decade each movie was made
        //remove the duplicates from the array
        //sort the array
        let decades = movies.map((movie) => {
          //convert number to char array
          let year = Array.from(movie.year.toString())

          //"round down" to get the decade
          //for example: 1968 -> 1960
          year[year.length - 1] = '0'
          year = parseInt(year.join(''))

          return year
        }).filter((decade, index, arr) => {
          return index === arr.indexOf(decade)
        }).sort()

        this.setState({
          movies: movieList,
          filteredMovies: movieList,
          decades: decades
        })

        if (storageAvailable('localStorage')) {
          window['localStorage'].setItem('movies', JSON.stringify(movieList))
          window['localStorage'].setItem('decades', JSON.stringify(decades))
        }
      })
    }

    if (!storedReviews.length) {
      getJSON('reviews', (reviews) => {
        // console.log(JSON.parse(reviews))
        this.setState({ reviews: JSON.parse(reviews) })

        if (storageAvailable('localStorage')) {
          window['localStorage'].setItem('reviews', reviews)
        }
      })
    }
  }

  searchByTitle(term) {
    //filter when the search term is at least two characters
    if (term.length > 1) {
      //get the selected decade to filter movies by decade as well
      let decade = this.state.selectedDecade
      let filteredMovies = this.state.movies.filter((movie) => {
        let containsTerm = movie.title.toLowerCase().includes(term)
        
        if (decade) {
          containsTerm = containsTerm  && (movie.year < decade + 10 && movie.year > decade)
        }

        return containsTerm
      })

      this.setState({ filteredMovies: filteredMovies })
    } else {
      if (this.state.selectedDecade) {
        this.setState({ filteredMovies: this.state.moviesByDecade })
      } else {
        this.setState({ filteredMovies: this.state.movies })
      }
    }
  }

  selectDecade(decade) {
    if (!decade) {
      this.setState({ 
        selectedDecade: '',
        filteredMovies: this.state.movies
      })

      return
    }

    let moviesByDecade = this.state.movies.filter((movie) => {
      let selectedDecade = parseInt(decade)

      return movie.year < selectedDecade + 10 && movie.year > selectedDecade
    })

    this.setState({ 
      selectedDecade: parseInt(decade),
      moviesByDecade: moviesByDecade,
      filteredMovies: moviesByDecade
    })
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
        </div>
        <SearchBar onSearch={this.searchByTitle}/>
        <Dropdown
          decades={this.state.decades}
          onDecadeSelect={this.selectDecade}/>
        <MovieList
          movies={this.state.filteredMovies}
          reviews={this.state.reviews}/>
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
