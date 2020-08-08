import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import SearchPage from "./Search/SearchPage";
import BookListPage from "./BookList/BookListPage";

class App extends React.Component {
  state = { books: [] };

  setupBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  };

  changeBookshelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.setupBooks();
    });
  };

  componentDidMount() {
    this.setupBooks();
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BookListPage
              books={this.state.books}
              onChangeBookShelf={this.changeBookshelf}
            />
          )}
        />

        <Route
          path="/search"
          render={() => (
            <SearchPage
              booksInList={this.state.books}
              onChangeBookShelf={this.changeBookshelf}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
