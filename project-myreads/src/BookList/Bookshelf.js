import React, { Component } from "react";
import Book from "./Book";

class Bookshelf extends Component {
  render() {
    const { title, books, onChangeBookshelf } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  booksInMyList={books}
                  onChangeBookshelf={onChangeBookshelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
