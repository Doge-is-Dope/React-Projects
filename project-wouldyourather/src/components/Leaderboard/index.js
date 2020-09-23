import React, { Component } from "react";
import { connect } from "react-redux";

class Leaderboard extends Component {
  render() {
    return (
      <div>
        <h3>Leader board</h3>
      </div>
    );
  }
}

export default connect()(Leaderboard);
