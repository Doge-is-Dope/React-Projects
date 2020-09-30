import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

class Question extends Component {
  handleViewPoll = (e) => {
    e.preventDefault();
    const { id, history } = this.props;
    history.push({
      pathname: `/questions/${id}`,
      state: { id: id },
    });
  };

  render() {
    const { question, user, id } = this.props;
    const questionHeader = user.name;
    const questionDescription = question.optionOne.text.substring(0, 15);

    return (
      <Link to={`/questions/${id}`}>
        <div className="dashboard-list-container">
          <div>
            <div>
              <div>{questionHeader} says:</div>
            </div>
            <div style={{ height: 110 }}>
              <img src={user.avatarURL} style={{ height: 100, width: 100 }} />
              <div className="verticle-divider"></div>
              <div className="dashboard-list-question-info description">
                <div className="ui header">Would you rather</div>
                <div style={{ marginBottom: 8 }}>
                  .... {questionDescription} ....
                </div>
                <div
                  fluid
                  basic
                  color="teal"
                  style={{ height: 30, fontSize: 12 }}
                  onClick={this.handleViewPoll}
                >
                  View Poll
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

function mapStateToProps({ questions, users }, { id }) {
  const question = questions[id];
  const user = users[question.author];
  return {
    question,
    user,
  };
}

export default withRouter(connect(mapStateToProps)(Question));
