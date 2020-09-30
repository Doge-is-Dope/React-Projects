import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { makeStyles, Grid, Typography, Paper, Avatar } from "@material-ui/core";

const Question = (props) => {
  const handleViewPoll = (e) => {
    e.preventDefault();
    const { id, history } = props;
    history.push({
      pathname: `/questions/${id}`,
      state: { id: id },
    });
  };

  const classes = useStyles();
  const { question, user, id } = props;
  const questionHeader = user.name;
  const questionDescription = question.optionOne.text;

  return (
    // <Link to={`/questions/${id}`}>
    <Paper className={classes.root}>
      <Grid container spacing={6}>
        <Grid item>
          <Avatar
            src={user.avatarURL}
            alt={`avatar of ${user.name}`}
            className={classes.avatar}
          />
        </Grid>

        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" color="primary">
                {questionHeader} says
              </Typography>

              <div className="verticle-divider"></div>

              <Typography variant="body2" gutterBottom>
                Would you rather
              </Typography>
              <Typography variant="body2" color="textSecondary">
                .... {questionDescription} ....
              </Typography>
            </Grid>
            <Grid item>
              <div onClick={handleViewPoll} style={{ cursor: "pointer" }}>
                View Poll
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    // </Link>
  );
};

function mapStateToProps({ questions, users }, { id }) {
  const question = questions[id];
  const user = users[question.author];
  return {
    question,
    user,
  };
}

export default withRouter(connect(mapStateToProps)(Question));

const useStyles = makeStyles((theme) => ({
  root: {
    flexFlow: 1,
  },
  avatar: {
    width: 128,
    height: 128,
  },
}));
