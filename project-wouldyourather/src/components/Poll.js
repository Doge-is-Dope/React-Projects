import React, { useState } from "react";

import { connect } from "react-redux";
import { handleAddAnswer } from "../actions/questions";
import { withRouter } from "react-router-dom";
import {
  Grid,
  Paper,
  Button,
  Avatar,
  Card,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  Divider,
  Typography,
  makeStyles,
} from "@material-ui/core";

const Poll = (props) => {
  const classes = useStyles();
  const {
    dispatch,
    question,
    selectedAnswer,
    author,
    isError,
    authedUser,
  } = props;

  if (isError) {
    return <div>error</div>;
  }
  return (
    <>
      {selectedAnswer ? (
        <AnsweredCard
          selectedAnswer={selectedAnswer}
          authedUser={authedUser}
          author={author}
          question={question}
        />
      ) : (
        <UnansweredCard
          dispatch={dispatch}
          authedUser={authedUser}
          author={author}
          question={question}
        />
      )}
    </>
  );
};

const UnansweredCard = (props) => {
  const classes = useStyles();
  const [selected, setSelected] = useState("");
  const { dispatch, authedUser, question, author } = props;

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selected !== "") {
      dispatch(
        handleAddAnswer({
          authedUser,
          questionId: question.id,
          answer: selected,
        })
      );
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography
          variant="subtitle1"
          className={classes.title}
          color="textSecondary"
        >
          {author.name} asks
        </Typography>

        <Divider />
        <Grid container spacing={2} justify="space-evenly" alignItems="center">
          <Grid item>
            <Avatar src={author.avatarURL} className={classes.avatar} />
          </Grid>

          <Grid item xs={12} sm container direction="column">
            <FormControl className={classes.formControl}>
              <Typography variant="h6">Would you rather...</Typography>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={selected}
                onChange={handleChange}
              >
                <FormControlLabel
                  control={<Radio />}
                  value="optionOne"
                  label={question.optionOne.text}
                />
                <FormControlLabel
                  control={<Radio />}
                  value="optionTwo"
                  label={question.optionTwo.text}
                />
              </RadioGroup>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                className={classes.button}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

const AnsweredCard = (props) => {
  const classes = useStyles();
  const [selected, setSelected] = useState("");
  const { selectedAnswer, authedUser, question, author } = props;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography
          variant="subtitle1"
          className={classes.title}
          color="textSecondary"
        >
          {author.name} asks
        </Typography>

        <Divider />
        <Grid container spacing={2} justify="space-evenly" alignItems="center">
          <Grid item>
            <Avatar src={author.avatarURL} className={classes.avatar} />
          </Grid>

          <Grid item xs={12} sm container direction="column"></Grid>
        </Grid>
      </Paper>
    </div>
  );
};

function mapStateToProps({ authedUser, questions, users }, { match }) {
  const questionId = match.params.question_id;
  const question = questions[questionId];

  // question not found
  if (question === undefined) {
    return {
      isError: true,
    };
  }

  const author = users[question.author];
  const isError = false;

  let selectedAnswer = null;
  if (question.optionOne.votes.includes(authedUser)) {
    selectedAnswer = "optionOne";
  } else if (question.optionTwo.votes.includes(authedUser)) {
    selectedAnswer = "optionTwo";
  } else {
    selectedAnswer = null;
  }

  return {
    questionId,
    question,
    selectedAnswer,
    author,
    isError,
    authedUser,
  };
}

export default withRouter(connect(mapStateToProps)(Poll));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  avatar: {
    width: 100,
    height: 100,
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));
