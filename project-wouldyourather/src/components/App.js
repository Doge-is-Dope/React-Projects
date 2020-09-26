import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Nav from "./Nav";
import Login from "./Login";
import Home from "./Home";
import Add from "./Add";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    const { loggedIn } = this.props;

    return (
      <Router>
        <Fragment>
          <div className="container">
            {loggedIn ? (
              <div>
                <Nav />
                <div>
                  <Route path="/" exact component={Home}></Route>
                  <Route path="/new" exact component={Add}></Route>
                </div>
              </div>
            ) : (
              <div>
                <Login />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loggedIn: authedUser !== null,
  };
}

export default connect(mapStateToProps)(App);
