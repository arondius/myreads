import React from 'react'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  state = {
    bookList: []
  }

  componentDidMount() {
    this.getAllBooks();
  }
  
  getAllBooks() {
    BooksAPI.getAll().then((bookList) => {
      // Setting this.state.bookList to array with Books
      return this.setState({bookList});
    })
  }
  
  changeBookShelf = (bookToUpdate, shelf) => {
    BooksAPI.update(bookToUpdate, shelf).then((newBookList) => {

      // So here we need to use the return value from the API result (newBookList), 
      // instead of doing book.shelf = shelf.
      // Only setting the shelf of the book in state.booklist will cause a problem when
      // setting the shelf to 'none'. This will not remove the books from state
      // The API promise result is the source of thruth that should be used to update 
      // state.

      const bookList = this.state.bookList;
      let books = [];
      for(const newShelf in newBookList) {
        if(newBookList.hasOwnProperty(newShelf)) {
          newBookList[newShelf].map( (id, key) => {
             const book = ( bookList.filter((b) => b.id === id)[0] ) ? (bookList.filter((b) => b.id === id)[0]) : bookToUpdate;
             book.shelf = newShelf;
            return books.push(book);
          })
        }
      }
      this.setState({bookList: books});
    });
  }

  render() {
    const bookShelves = ["currentlyReading", "wantToRead", "read"];
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks bookList={this.state.bookList} bookShelves={bookShelves} onChangeBookShelf={this.changeBookShelf.bind(this)} />
        )}
        />
        <Route path="/search" render={() => (
          <SearchBooks onChangeBookShelf={this.changeBookShelf.bind(this)} bookList={this.state.bookList}/>
        )}
        />
      </div>
    )
  }
}

export default BooksApp
