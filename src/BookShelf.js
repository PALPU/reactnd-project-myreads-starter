import React, { Component } from "react";
import PropTypes from "prop-types";
import Book from "./Book";
class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfName: PropTypes.string.isRequired,
  };
  render() {
    const { books, shelfName, updateBooks } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books
              .filter((book) => book.shelf === shelfName)
              .map((item) => (
                <li key={item.id}>
                  <Book
                    title={item.title}
                    authors={item.authors}
                    shelf={item.shelf}
                    imageURL={item.imageLinks.thumbnail}
                    updateBook={(shelf) => {
                      updateBooks(item, shelf);
                    }}
                  />
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}
export default BookShelf;
