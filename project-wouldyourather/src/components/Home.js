import React, { useState } from "react";
import { connect } from "react-redux";
import Question from "./Question";

const Home = (props) => {
  const [showAnswered, setShowAnswered] = useState(false);

  const { unansweredQuestions, answeredQuestions } = props;

  return (
    <div>
      <h3 className="center">Questions</h3>
      <div className="btn-group">
        <button
          className={!showAnswered ? "btn-lft active" : "btn-lft"}
          onClick={(event) => setShowAnswered(false)}
        >
          Unanswered
        </button>
        <button
          className={showAnswered ? "btn-rght active" : "btn-rght"}
          onClick={(event) => setShowAnswered(true)}
        >
          Answered
        </button>
      </div>

      <ul className="question-list">
        {showAnswered
          ? answeredQuestions.map((questionId) => (
              <li key={questionId}>
                <Question id={questionId} />
              </li>
            ))
          : unansweredQuestions.map((questionId) => (
              <li key={questionId}>
                <Question id={questionId} />
              </li>
            ))}
      </ul>
    </div>
  );
};

function mapStateToProps({ authedUser, questions }) {
  const unansweredQuestions = Object.keys(questions)
    .filter(
      (i) =>
        !questions[i].optionOne.votes.includes(authedUser) &&
        !questions[i].optionTwo.votes.includes(authedUser)
    )
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);
  const answeredQuestions = Object.keys(questions)
    .filter(
      (i) =>
        questions[i].optionOne.votes.includes(authedUser) ||
        questions[i].optionTwo.votes.includes(authedUser)
    )
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);
  return {
    unansweredQuestions,
    answeredQuestions,
  };
}

export default connect(mapStateToProps)(Home);
