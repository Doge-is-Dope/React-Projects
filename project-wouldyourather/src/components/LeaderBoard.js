import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Avatar,
  Paper,
  Grid,
  Divider,
  Typography,
  makeStyles,
} from "@material-ui/core";

class LeaderBoard extends Component {
  render() {
    const { usersDetails } = this.props;
    return (
      <div>
        {usersDetails.map((user) => (
          <li key={user.name}>
            <UserCard user={user} />
          </li>
        ))}
      </div>
    );
  }
}

const UserCard = (props) => {
  const classes = useStyles();
  const { user } = props;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <Avatar
              className={classes.avatar}
              alt="avatar"
              src={user.avatarURL}
            />
          </Grid>

          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h6">
                  {user.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Answered questions: {user.answeredQuestions}
                </Typography>
                <Divider className={classes.divider} />
                <Typography variant="body2">
                  Created questions: {user.createdQuestions}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              item
              xs={3}
              container
              direction="column"
              justify="space-evenly"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="subtitle2" color="textSecondary">
                  Score
                </Typography>
              </Grid>
              <Grid>
                <Typography variant="h3" color="primary">
                  {user.score}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

function mapStateToProps({ users }) {
  const usersDetails = Object.keys(users)
    .map((userId) => {
      const userCardDetails = {
        name: users[userId].name,
        avatarURL: users[userId].avatarURL,
        answeredQuestions: Object.keys(users[userId].answers).length,
        createdQuestions: users[userId].questions.length,
      };
      const score =
        userCardDetails.answeredQuestions + userCardDetails.createdQuestions;
      userCardDetails.score = score;
      return userCardDetails;
    })
    .sort((a, b) => b.score - a.score);
  return {
    usersDetails,
  };
}

export default connect(mapStateToProps)(LeaderBoard);

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
    margin: "auto",
    width: 120,
    height: 120,
  },

  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
