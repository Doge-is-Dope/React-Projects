import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";
import { handleInitialData } from "../actions/shared";
import Nav from "./Nav";
import Login from "./Login";
import Home from "./Home";
import Add from "./Add";
import LeaderBoard from "./LeaderBoard";
import Poll from "./Poll";
import NotFound from "./NotFound";
import PrivateRoute from "./PrivateRoute";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    const { authedUser } = this.props;

    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            {authedUser === null ? (
              <Route render={() => <Login />} />
            ) : (
              <>
                <Nav />
                <Switch>
                  {/* <Route path="/login" exact component={Login} /> */}
                  <PrivateRoute path="/" exact component={Home} />
                  <PrivateRoute path="/add" exact component={Add} />
                  <PrivateRoute
                    path="/leaderboard"
                    exact
                    component={LeaderBoard}
                  />
                  <PrivateRoute
                    path="/questions/:question_id"
                    exact
                    component={Poll}
                  />
                  <Route component={NotFound} />
                </Switch>
              </>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(App);
