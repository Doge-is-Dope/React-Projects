import React, { Component } from "react";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    return (
      <div>
        <h3>Home</h3>
      </div>
    );
  }
}

export default connect()(Home);
