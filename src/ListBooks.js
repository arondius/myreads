import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';

const ListBooks = (props) => {

  const onBookShelfChanged = (book, shelf) => {
    props.onChangeBookShelf(book, shelf);
  }

  const renderBooks = (bookShelf) => {
    if(props.bookList) {
      const books = props.bookList.filter((book) => book.shelf === bookShelf)
      return (
        <ol className="books-grid">
          {books.map((book) =>
            <Book book={book} onChangeBookShelf={onBookShelfChanged.bind(this)} key={book.id} currentShelf={book.shelf}/>
          )}
        </ol>
      )
    }
  }

  const renderBookshelves = () => {
    if(props.bookShelves && props.bookShelves.length > 0) {
      return (
        props.bookShelves.map((bookShelf) => 
        <div className="bookshelf" key={bookShelf}>
          <h2 className="bookshelf-title">{bookShelf}</h2>
          <div className="bookshelf-books">
            {renderBooks(bookShelf)}
          </div>
        </div>
      ))
    }
  }

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {renderBookshelves()}
        </div>
      </div>
      <div className="open-search">
        <Link className="open-search" to="/search">Search</Link>
      </div>
    </div>
  )
}

ListBooks.propTypes = {
  onChangeBookShelf: PropTypes.func.isRequired,
  bookShelves: PropTypes.array.isRequired,
  bookList: PropTypes.array.isRequired
}

export default ListBooks;