import React from 'react';
import BookShelfChanger from './BookShelfChanger';
import PropTypes from 'prop-types';

const Book = (props) => {

  const renderAuthors = () => {
    if(props.book.authors && props.book.authors.length > 0) {
      const authors = props.book.authors.map(author => <li className="book-authors__author" key={author}>{author}</li>);
      return (
        <ul className="book-authors">{authors}</ul>
      )
    }
  }

  const onBookShelfChanged = (book, shelf)  => {
    props.onChangeBookShelf(book, shelf);
  }

  const thumb = props.book.imageLinks ? props.book.imageLinks.thumbnail : 'https://books.google.nl/googlebooks/images/no_cover_thumb.gif';

  return(
    <li key={props.book.title}>
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
            onChangeBookShelf={onBookShelfChanged.bind(this)}
            book={props.book}
            currentShelf={props.currentShelf}
          />
        </div>
        <div className="book-title">{props.book.title}</div>
        {renderAuthors()}
      </div>
    </li>
  )
}

Book.propTypes = {
  onChangeBookShelf: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired,
  currentShelf: PropTypes.string.isRequired,
}

export default Book;