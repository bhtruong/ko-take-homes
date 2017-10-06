import Reach, { Component } from 'react'

class SearchBar extends Component {
  constructor(prop) {
    super(prop)

    this.state = { term: '' }
  }

  handleChange(event) {
    let term = event.target.value

    this.setState({ term: term })
    this.props.onSearch(term)
  }

  render() {
    return (
      <div>
        <label>Title contains:
          <input type="text" placeholder="Search by title"
            value={this.state.term}
            onChange={(event) => {this.handleChange(event)}}/>
        </label>
      </div>
    )
  }
}

export default SearchBar