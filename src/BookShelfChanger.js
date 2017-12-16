import React, { Component } from 'react'
class BookShelfChanger extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shelfChangeValue: this.props.book.shelf ? this.props.book.shelf : 'none'
    };
  }

  onBookShelfChanged(book, event) {
    const shelf = event.target.value;
    this.setState({shelfChangeValue: shelf});
    //console.log('BookShelfChanger.js book', book);
    this.props.onChangeBookShelf(book, shelf);
  }

  render() {
    return(
      <div className="book-shelf-changer">
        <select onChange={(e) => this.onBookShelfChanged(this.props.book, e)} defaultValue={this.state.shelfChangeValue}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default BookShelfChanger