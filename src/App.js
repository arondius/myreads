import React from 'react'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  state = {
    bookList: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((bookList) => {
      // Setting this.state.bookList to array with Books
      this.setState({bookList});

    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks bookList={this.state.bookList}/>
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
