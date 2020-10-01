import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import {
  makeStyles,
  Grid,
  Typography,
  Paper,
  Avatar,
  Button,
  Container,
  Link,
  CssBaseline,
  Box,
} from "@material-ui/core";
import { setAuthedUser } from "../actions/authedUser";

const Login = (props) => {
  const classes = useStyles();
  const [userId, setUserId] = useState(null);
  const [toHome, setToHome] = useState(false);
  const selected = userId ? userId : -1;

  const handleSelectionChanged = (event) => {
    const userId = event.target.value;

    setUserId(userId);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const { dispatch } = props;

    dispatch(setAuthedUser(userId));

    setUserId(-1);
    setToHome(true);
  };

  if (toHome) {
    return <Redirect to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Welcome to the Would You Rather App!
        </Typography>
        <p>Please sign in to continue</p>
      </div>

      <form className={classes.form} noValidate>
        <select
          value={selected}
          onChange={(event) => handleSelectionChanged(event)}
        >
          <option value={-1} disabled>
            Select user...
          </option>
          {props.users.map((id) => (
            <option value={id} key={id}>
              {id}
            </option>
          ))}
        </select>
      </form>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={!userId}
        onClick={handleLogin}
      >
        Login
      </Button>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © Chun-Chieh Liang "}
      {new Date().getFullYear()}
    </Typography>
  );
};

const mapStateToProps = ({ users }) => {
  // console.log(`users: ${JSON.stringify(users)}`);
  return {
    users: Object.keys(users),
  };
};
export default withRouter(connect(mapStateToProps)(Login));

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
