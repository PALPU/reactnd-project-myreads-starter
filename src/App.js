import React from "react";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";
import SearchBar from "./SearchBar";
import constants from "./constants";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage: false,
  };
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books: books,
      }));
    });
  }
  helperUpdateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then((books) => {
        this.setState(() => ({
          books: books,
        }));
      });
    });
  };
  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <SearchBar
              books={this.state.books}
              updateBooks={this.helperUpdateBook}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {constants.bookShelfs.map((bookshelf) => (
                    <BookShelf
                      key={bookshelf}
                      books={this.state.books}
                      shelfName={bookshelf}
                      updateBooks={(book, shelf) => {
                        this.helperUpdateBook(book, shelf);
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="open-search">
                <Link to="/search" className="open-search">
                  Add a book
                </Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
