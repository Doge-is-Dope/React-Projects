import React, { useState } from "react";

import { connect } from "react-redux";
import { handleAddAnswer } from "../actions/questions";
import { withRouter } from "react-router-dom";
import {
  Grid,
  Paper,
  Button,
  Avatar,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  Divider,
  Typography,
  LinearProgress,
  makeStyles,
  withStyles,
} from "@material-ui/core";

const Poll = (props) => {
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
  const { selectedAnswer, question, author } = props;

  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const totalVotes = optionOneVotes + optionTwoVotes;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography
          variant="subtitle1"
          className={classes.title}
          color="textSecondary"
        >
          Asked by {author.name}
        </Typography>

        <Divider />
        <Grid container spacing={2} justify="space-evenly" alignItems="center">
          <Grid item>
            <Avatar
              src={author.avatarURL}
              alt={`avatar of ${author.name}`}
              className={classes.avatar}
            />
          </Grid>

          <Grid item xs={12} sm container direction="column">
            <div className={classes.formControl}>
              <Typography variant="h6">Results</Typography>

              <OptionCard
                option={question.optionOne}
                totalVotes={totalVotes}
                currentVotes={optionOneVotes}
                isSelected={selectedAnswer === "optionOne"}
              />

              <Divider className={classes.divider} />

              <OptionCard
                option={question.optionTwo}
                totalVotes={totalVotes}
                currentVotes={optionTwoVotes}
                isSelected={selectedAnswer === "optionTwo"}
              />
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

const OptionCard = (props) => {
  const classes = useStyles();
  const { option, isSelected, currentVotes, totalVotes } = props;
  return (
    <Paper
      className={classes.paper}
      variant="outlined"
      style={{ backgroundColor: isSelected && "#e3f2fd" }}
    >
      {isSelected && (
        <div className={`ribbon ribbon-top-right`}>
          <span />
        </div>
      )}
      <Typography variant="h6" gutterBottom>
        {option.text}
      </Typography>

      <BorderLinearProgress
        variant="determinate"
        value={(currentVotes / totalVotes) * 100}
      />

      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        className={classes.votesDesc}
      >
        {currentVotes} out of {totalVotes}
      </Typography>
    </Paper>
  );
};

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 16,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 300 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

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
    position: "relative",
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
  divider: {
    margin: theme.spacing(2),
  },
  votesDesc: {
    margin: theme.spacing(1, 1, 0, 0),
  },

  ribbon: {
    background: "rebeccapurple",
    color: "white",
    padding: "0 16px",
    position: "absolute",
    top: 0,
    right: 0,
    transform: "translateX(30%) translateY(0%) rotate(45deg)",
    overflow: "hidden",
  },
}));
