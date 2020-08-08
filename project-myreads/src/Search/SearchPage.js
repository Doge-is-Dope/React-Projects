import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "../BookList/Book";

class SearchPage extends Component {
  state = {
    query: "",
    searchedBooks: [],
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
      searchedBooks: [],
    });
  };

  searchBook = (query) => {
    BooksAPI.search(query).then((books) => {
      if (books !== undefined) {
        this.setState({
          searchedBooks: books,
        });
      } else {
        this.setState({
          searchedBooks: [],
        });
      }
    });
  };

  // setBookShelf = (books) => {
  //   return books.map((book) => {
  //     return this.getBookshelf(book);
  //   });
  // };

  // getBookshelf = (book) => {
  //   BooksAPI.get(book.id).then((result) => {
  //     console.log(`getBookshelf: ${result.shelf}`);
  //     return result;
  //   });
  // };

  // changeBookshelf = (book, shelf) => {
  //   console.log(`book title: ${book.title}, shelf: ${shelf}`);
  //   BooksAPI.update(book, shelf).then((result) => {
  //     console.log(result);
  //   });
  // };

  render() {
    const { query, searchedBooks } = this.state;
    const { booksInList, onChangeBookShelf } = this.props;

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
            {query !== "" && !searchedBooks.error
              ? searchedBooks.map((book) => (
                  <li key={book.id}>
                    <Book
                      book={book}
                      booksInMyList={booksInList}
                      onChangeBookshelf={onChangeBookShelf}
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
