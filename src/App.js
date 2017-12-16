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
  
  changeBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((newBookList) => {
      //console.log('App.js newBookList', newBookList);

      // So here we need to use the return value from the API result (newBookList), 
      // instead of using book.shelf = shelf, as the API result is the source of thruth here
      // Merely setting the shelf of the book to the
      
      let books = [];
      const bookList = this.state.bookList;
      
      for(const newShelf in newBookList) {
        if(newBookList.hasOwnProperty(newShelf)) {
          newBookList[newShelf].map( (id) => (
            books.push(...bookList.filter(b => b.id === id))
          ))
        }
      }
      this.setState({bookList: books});
      console.log('App.js state booklist after changeBookShelf ',this.state.bookList);
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
          <SearchBooks onChangeBookShelf={this.changeBookShelf.bind(this)}/>
        )}
        />
      </div>
    )
  }
}

export default BooksApp
