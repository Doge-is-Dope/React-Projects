import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookListHeader from "./BookListHeader";
import Bookshelf from "./Bookshelf";
import * as BooksAPI from "../BooksAPI";

class BookListPage extends Component {
  state = {
    books: [],
    shelfTitles: ["Currently Reading", "Want to Read", "Read"],
  };

  setupBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  };

  changeBookshelf = (book, shelf) => {
    console.log(`book title: ${book.title}, shelf: ${shelf}`);
    BooksAPI.update(book, shelf).then(() => {
      this.setupBooks();
    });
  };

  componentDidMount() {
    this.setupBooks();
  }

  render() {
    const { shelfTitles, books } = this.state;
    // console.log(this.state.books);
    return (
      <div className="list-books">
        <BookListHeader />

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
              onChangeBookshelf={this.changeBookshelf}
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
