import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ListBooks extends Component {

  renderBookshelves() {
    if(this.props.bookShelves.length > 0) {
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
            <li key={book.title}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + book.imageLinks.thumbnail + ')' }}></div>
                  <div className="book-shelf-changer">
                    <select>
                      <option value="none" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <ul className="book-authors">{book.authors.map(author => <li className="book-authors__author" key={author}>{author}<br/></li>)}</ul>
              </div>
            </li>
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