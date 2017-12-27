import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Debounce } from 'react-throttle';
import { search } from './BooksAPI';
import Book from './Book';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
        query: '',
        results: []
    }
  }

  
  onBookShelfChanged(book, shelf) {
    this.props.onChangeBookShelf(book, shelf);
  }
  
  updateQuery(query) {
    this.setState({ query: query });
    if(this.state.query.length > 1) {
      search(this.state.query.trim()).then((results) => {
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
      const books = this.state.results.map((book) => {
        
        // We check if the book that was returned from the search query matches 
        // a book in the current bookList. If it's already in our bookShelf we 
        // want to assign it's shelf to the book in the search results page.
        const shelf = ( this.props.bookList.filter((b) => b.id === book.id)[0])  
        ? this.props.bookList.filter((b) => b.id === book.id)[0].shelf : 'none';
        
        return (
          <Book 
            book={book} 
            onChangeBookShelf={this.onBookShelfChanged.bind(this)} key={book.id} currentShelf={shelf}
          />
        )
      })
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
            <Debounce time="600" handler="onChange">
              <input onChange={(event) => {this.updateQuery(event.target.value)}} type="text" placeholder="Search by title or author"/>
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          {this.renderBooks()}
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  onChangeBookShelf: PropTypes.func.isRequired,
  bookList: PropTypes.array.isRequired,
}

export default Search;