import React, { Component } from 'react'
import BookShelfChanger from './BookShelfChanger'

class Book extends Component {
  renderAuthors() {
    if(this.props.book.authors && this.props.book.authors.length > 0) {
      const authors = this.props.book.authors.map(author => <li className="book-authors__author" key={author}>{author}</li>);
      return (
        <ul className="book-authors">{authors}</ul>
      )
    }
  }

  onBookShelfChanged(book, shelf) {
    this.props.onChangeBookShelf(book, shelf);
  }

  render() {
    const thumb = this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : 'https://books.google.nl/googlebooks/images/no_cover_thumb.gif';
    return(
      <li key={this.props.book.title}>
        <div className="book">
          <div className="book-top">
            <div 
              className="book-cover" 
              style={{ 
                width: 128, 
                height: 193, 
                backgroundImage: 'url(' + thumb + ')',
                backgroundSize: 'cover'
              }} 
            />
            <BookShelfChanger
              onChangeBookShelf={this.onBookShelfChanged.bind(this)}
              book={this.props.book}
            />
          </div>
          <div className="book-title">{this.props.book.title}</div>
          {this.renderAuthors()}
        </div>
      </li>
    )
  }
}

export default Book;