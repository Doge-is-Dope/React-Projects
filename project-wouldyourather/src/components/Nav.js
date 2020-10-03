import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";

import { logOut } from "../actions/authedUser";

class Nav extends Component {
  handleLogout = (e) => {
    e.preventDefault();

    this.props.dispatch(logOut());
  };

  render() {
    const { authedUser, users } = this.props;
    const user = users[authedUser];

    return (
      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add" exact activeClassName="active">
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard" exact activeClassName="active">
              Leader Board
            </NavLink>
          </li>

          <li style={{ float: "right" }}>
            <Button
              color="primary"
              variant="outlined"
              onClick={this.handleLogout}
            >
              Log out
            </Button>
          </li>

          <li style={{ float: "right" }}>Hi, {user.name}</li>
        </ul>
      </nav>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(Nav);
