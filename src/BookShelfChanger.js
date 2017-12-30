import React from 'react'
import PropTypes from 'prop-types';

const BookShelfChanger = (props) => {

  const onBookShelfChanged = (book, event) => {
    const shelf = event.target.value;
    props.onChangeBookShelf(book, shelf);
  }

  return(
    <div className="book-shelf-changer">
      <select onChange={(e) => onBookShelfChanged(props.book, e)} defaultValue={props.currentShelf}>
        <option value="none" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  )
}

BookShelfChanger.propTypes = {
  onChangeBookShelf: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired,
  currentShelf: PropTypes.string.isRequired,
}

export default BookShelfChanger