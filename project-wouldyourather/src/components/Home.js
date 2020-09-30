import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles, Paper, Tabs, Tab, Grid } from "@material-ui/core";
import Question from "./Question";

const Home = (props) => {
  const classes = useStyles();
  const [showAnswered, setShowAnswered] = useState(0);
  const { unansweredQuestions, answeredQuestions } = props;

  return (
    <div>
      <Paper className={classes.root}>
        <Tabs
          value={showAnswered}
          onChange={(event, newValue) => setShowAnswered(newValue)}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Unanswered" />
          <Tab label="Answered" />
        </Tabs>
      </Paper>

      <ul>
        {showAnswered
          ? answeredQuestions.map((questionId) => (
              <Question key={questionId} id={questionId} />
            ))
          : unansweredQuestions.map((questionId) => (
              <Question key={questionId} id={questionId} />
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

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});
