import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { search } from './BooksAPI'
import Book from './Book'

class Search extends Component {
  state = {
    query: '',
    results: []
  }
  
  onBookShelfChanged(book, shelf) {
    this.props.onChangeBookShelf(book, shelf);
  }
  
  updateQuery(query) {
    this.setState({ query: query.trim() });
    if(this.state.query.length > 1) {
      search(this.state.query).then((results) => {
        this.setState({results});
      }
    )}
  }
  
  renderBooks() {
    if(this.state.results.error) {
      return (
        <p className="books-grid">No books with that title</p>
      )
    }
    else if(this.state.results.length > 0) {
      const books = this.state.results.map((book) => <Book key={book.id} book={book} onChangeBookShelf={this.onBookShelfChanged.bind(this)} />)
      return (
      <ol className="books-grid">
        {books}
      </ol>
      )
    }
  }

  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input onChange={(event) => {this.updateQuery(event.target.value)}} type="text" placeholder="Search by title or author" value={this.state.query}/>

          </div>
        </div>
        <div className="search-books-results">
          {this.renderBooks()}
        </div>
      </div>
    )
  }
}

export default Search