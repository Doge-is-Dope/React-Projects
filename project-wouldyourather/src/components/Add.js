import React, { Component } from "react";
import { connect } from "react-redux";

class Add extends Component {
  render() {
    return (
      <div>
        <h3>New</h3>
      </div>
    );
  }
}

export default connect()(Add);
