import React from "react";
import { Route } from "react-router-dom";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import SearchPage from "./Search/SearchPage";
import BookListPage from "./BookList/BookListPage";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={BookListPage} />
        <Route path="/search" component={SearchPage} />
      </div>
    );
  }
}

export default App;
