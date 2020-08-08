import React, { Component } from "react";

class Book extends Component {
  handleChange = (event) => {
    const value = event.target.value;
    if (this.props.onChangeBookshelf) {
      this.props.onChangeBookshelf(this.props.book, value);
    }
  };

  render() {
    const { book, booksInMyList } = this.props;

    let defaultValue = "none";

    for (let b of booksInMyList) {
      if (b.id === book.id) {
        defaultValue = b.shelf;
        break;
      }
    }

    return (
      <div className="book">
        <div className="book-top">
          {book.imageLinks && (
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks.thumbnail})`,
              }}
            />
          )}

          <div className="book-shelf-changer">
            <select defaultValue={defaultValue} onChange={this.handleChange}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors &&
          book.authors.map((author, index) => (
            <div key={index} className="book-authors">
              {author}
            </div>
          ))}
      </div>
    );
  }
}

export default Book;
