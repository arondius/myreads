import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book'
class ListBooks extends Component {

  onBookShelfChanged(book, shelf) {
    this.props.onChangeBookShelf(book, shelf);
  }

  renderBookshelves() {
    // console.log('ListBooks.js this.props in renderBookshelves ', this.props);
    if(this.props.bookShelves && this.props.bookShelves.length > 0) {
      return (
        this.props.bookShelves.map((bookShelf) => 
          <div className="bookshelf" key={bookShelf}>
            <h2 className="bookshelf-title">{bookShelf}</h2>
            <div className="bookshelf-books">
              {this.renderBooks(bookShelf)}
            </div>
          </div>
      ))
    }
  }
  
  renderBooks(bookShelf) {
    if(this.props.bookList) {
      const books = this.props.bookList.filter((book) => book.shelf === bookShelf)
      return (
        <ol className="books-grid">
          {books.map((book) =>
            <Book book={book} onChangeBookShelf={this.onBookShelfChanged.bind(this)} key={book.title}/>
          )}
        </ol>
      )
    }
  }

  render() {
    return(

      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.renderBookshelves()}
          </div>
        </div>
        <div className="open-search">
          <Link className="open-search" to="/search">Search</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks;