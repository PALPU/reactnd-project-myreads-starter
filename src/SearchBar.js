import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
class searchBar extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBooks: PropTypes.func.isRequired,
  };
  state = {
    booksList: [],
  };
  updateQuery = (query, books) => {
    query !== ""
      ? BooksAPI.search(query).then((booksL) => {
          booksL.hasOwnProperty("error")
            ? this.setState(() => ({
                booksList: [],
              }))
            : this.setState(() => {
                const newBooksList = booksL.map((book) => {
                  const b1 = books.filter((b) => b.id === book.id);
                  return b1.length === 0 ? book : b1[0];
                });
                return {
                  booksList: newBooksList,
                };
              });
        })
      : this.setState(() => ({
          booksList: [],
        }));
  };
  clearQuery = () => {
    this.updateQuery("");
  };
  render() {
    const { booksList } = this.state;
    const { updateBooks, books } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event.target.value, books)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {booksList && (
            <ol className="books-grid">
              {booksList
                .filter((book) => book.imageLinks !== undefined)
                .map((book) => (
                  <li key={book.id}>
                    <Book
                      title={book.title}
                      authors={book.authors}
                      shelf={book.shelf}
                      imageURL={book.imageLinks.thumbnail}
                      updateBook={(shelf) => {
                        updateBooks(book, shelf);
                      }}
                    />
                  </li>
                ))}
            </ol>
          )}
        </div>
      </div>
    );
  }
}
export default searchBar;
