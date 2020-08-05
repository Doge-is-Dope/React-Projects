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
    BooksAPI.search(query)
      .then((result) => {
        console.log(result);
        if (result instanceof Array) {
          this.setState({ books: result });
        } else {
          this.setState({ books: [] });
        }
      })
      .catch((error) => {
        console.log(error);
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
            {books.map((book) => (
              <li key={book.id}>
                <Book book={book} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
