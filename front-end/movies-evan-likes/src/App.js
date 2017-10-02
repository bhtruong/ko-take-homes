import React, { Component } from 'react'
import MovieList from './components/movie-list'

/*
 * converted App to a class based component to take advantage
 * of component level state.
 */
class App extends Component {
  constructor(prop) {
    super(prop);

    this.state = { movies: [] }

    this.getJSON('/movies', (movies) => { 
      //parse JSON string to object and sort by title
      let movieList = JSON.parse(movies).sort((a, b) => {
        if (a.title < b.title) { return -1 }
        if (a.title > b.title) { return 1 }
        return 0
      })

      this.setState({
        movies: movieList
      })
    })  
  }

  getJSON(url, callback) {
    let xhr = new XMLHttpRequest()
    xhr.onload = function() {
      callback(this.responseText)
    }
    xhr.open('GET', url, true) //asynchronous
    xhr.send()
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

export default App
