import React from 'react'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  state = {
    bookList: [],
    bookShelves: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((bookList) => {
      // Setting this.state.bookList to array with Books
      this.setState({bookList});

      // Get bookshelves names from this.state.bookList and setting this.state.bookShelves 
      // with array of unique bookShelf names so these shelves can by used within 
      // the rest of the application
      const bookShelves = [];
      this.state.bookList.map((book, index) => {
        if(!bookShelves.includes(book.shelf)) {
          console.log('book.shelf', book.shelf);
          bookShelves.push(book.shelf)
        }
        return bookShelves;
      })
      this.setState({bookShelves});
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks bookList={this.state.bookList} bookShelves={this.state.bookShelves}/>
        )}
        />
        <Route path="/search" render={() => (
          <SearchBooks />
        )}
        />
      </div>
    )
  }
}

export default BooksApp
