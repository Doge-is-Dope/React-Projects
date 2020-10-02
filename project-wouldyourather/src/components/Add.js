import { Divider } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";

class Add extends Component {
  render() {
    return (
      <div className="add-new-question-form">
        <div>
          <div className="ui header">Create New Question</div>
          <div>
            <div>Complete the question:</div>
            <div style={{ marginTop: "20px", marginBottom: "10px" }}>
              Would you rather ...
            </div>
            <input
              placeholder="Enter Option One Text Here"
              style={{ marginTop: "20px" }}
              onChange={this.handleInputOneChange}
            ></input>
            <Divider />
            <input
              placeholder="Enter Option Two Text Here"
              onChange={this.handleInputTwoChange}
            ></input>
            <button
              style={{
                justifyContent: "center",
                marginTop: "20px",
                marginBottom: "10px",
              }}
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Add);
