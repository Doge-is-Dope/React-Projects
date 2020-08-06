import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "../BookList/Book";

class SearchPage extends Component {
  state = {
    query: "",
    books: [],
  };

  handleChange = (query) => {
    this.setState({
      query,
    });
    if (query.length !== 0) {
      this.searchBook(query);
    } else {
      this.clearQuery();
    }
  };

  clearQuery = () => {
    this.setState({
      query: "",
      books: [],
    });
  };

  searchBook = (query) => {
    BooksAPI.search(query).then((books) => {
      books &&
        this.setState({
          books,
        });
      this.setBookShelf();
    });
  };

  setBookShelf = () => {
    const { books } = this.state;
    const newBooks = books.map((book) => {
      BooksAPI.get(book.id).then((result) => {
        console.log(`title: ${result.title} shelf: ${result.shelf}`);
      });

      return books;
    });
  };

  changeBookshelf = (book, shelf) => {
    console.log(`book title: ${book.title}, shelf: ${shelf}`);
    BooksAPI.update(book, shelf).then((result) => {
      console.log(result);
    });
  };

  render() {
    const { query, books } = this.state;
    // console.log(books);
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={query}
              placeholder="Search by title or author"
              onChange={(event) => this.handleChange(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {query !== "" && !books.error
              ? books.map((book) => (
                  <li key={book.id}>
                    <Book
                      book={book}
                      onChangeBookshelf={this.changeBookshelf.bind(this)}
                    />
                  </li>
                ))
              : query !== "" && <div>No books found</div>}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
