import React, { Component } from "react";

import { connect } from "react-redux";
import { handleAddAnswer } from "../actions/questions";
import { withRouter } from "react-router-dom";
import { Button, Card, Checkbox } from "@material-ui/core";

class Poll extends Component {
  state = {
    selectedCheckbox: "",
  };

  handleChange = (e, { value }) => {
    this.setState({ selectedCheckbox: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch, authedUser, id } = this.props;
    const { selectedCheckbox } = this.state;

    if (selectedCheckbox !== null) {
      dispatch(
        handleAddAnswer({
          authedUser: authedUser,
          questionId: id,
          answer: selectedCheckbox,
        })
      );
    }
  };

  render() {
    const { question, authorAvatar, isError, userName, answer } = this.props;
  }
}

function mapStateToProps({ authedUser, questions, users }, { match }) {
  if (questions[match.params.question_id] === undefined) {
    const isError = true;
    return {
      isError,
    };
  }
  const userName = users[questions[match.params.question_id].author].name;
  const id = match.params.question_id;
  const question = questions[id];

  let answer = "";
  if (question.optionOne.votes.includes(authedUser)) {
    answer = "optionOne";
  } else if (question.optionTwo.votes.includes(authedUser)) {
    answer = "optionTwo";
  } else {
    answer = null;
  }
  const authorAvatar = users[question.author].avatarURL;
  const isError = false;
  return {
    id,
    question,
    answer,
    authedUser,
    userName,
    authorAvatar,
    isError,
  };
}

export default withRouter(connect(mapStateToProps)(Poll));
