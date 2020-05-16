import React, { Component } from "react";
import constants from "./constants";
import Select from "./Select";
import PropTypes from "prop-types";
class Book extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    authors: PropTypes.array,
    shelf: PropTypes.string,
    imageURL: PropTypes.string.isRequired,
    updateBook: PropTypes.func.isRequired,
  };
  render() {
    const { title, authors, shelf, imageURL, updateBook } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${imageURL})`,
            }}
          />
          <div className="book-shelf-changer">
            <Select
              shelf={shelf}
              options={constants.dropDownOptions}
              updateShelves={(event) => {
                updateBook(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">
          {authors !== undefined && authors.length != 0 && authors.join(", ")}
        </div>
      </div>
    );
  }
}
export default Book;
