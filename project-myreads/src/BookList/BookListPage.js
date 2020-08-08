import React, { Component } from "react";
import { Link } from "react-router-dom";
import Bookshelf from "./Bookshelf";

class BookListPage extends Component {
  state = {
    shelfTitles: ["Currently Reading", "Want to Read", "Read"],
  };

  render() {
    const { shelfTitles } = this.state;
    const { books, onChangeBookShelf } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          {shelfTitles.map((shelfTitle) => (
            <Bookshelf
              key={shelfTitle}
              title={shelfTitle}
              books={books.filter(
                (book) =>
                  book.shelf.toLowerCase() ===
                  shelfTitle
                    .split(" ")
                    .join("")
                    .toLowerCase()
              )}
              onChangeBookshelf={onChangeBookShelf}
            />
          ))}
        </div>

        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BookListPage;
