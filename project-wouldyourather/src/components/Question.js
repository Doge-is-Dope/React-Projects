import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  makeStyles,
  Grid,
  Typography,
  Paper,
  Avatar,
  Button,
} from "@material-ui/core";

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
  const { question, user } = props;
  const questionDescription = question.optionOne.text;

  return (
    // <Link to={`/questions/${id}`}>
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <Avatar
              src={user.avatarURL}
              alt={`avatar of ${user.name}`}
              className={classes.avatar}
            />
          </Grid>

          <Grid item xs={12} sm container direction="column">
            <Typography gutterBottom variant="subtitle1" color="primary">
              {user.name} says
            </Typography>

            <div className="verticle-divider"></div>

            <Typography variant="body2" gutterBottom>
              Would you rather
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              gutterBottom
              style={{ marginBottom: 16 }}
            >
              .... {questionDescription} ....
            </Typography>

            <Button onClick={handleViewPoll} variant="outlined" color="primary">
              View Poll
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
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
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
    transition: "0.3s",
    "&:hover": {
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    },
  },
  avatar: {
    width: 100,
    height: 100,
  },
}));
