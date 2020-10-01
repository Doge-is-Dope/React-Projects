import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import {
  makeStyles,
  Typography,
  Avatar,
  Button,
  Container,
  Select,
  MenuItem,
  CssBaseline,
  Box,
} from "@material-ui/core";
import { setAuthedUser } from "../actions/authedUser";

const Login = (props) => {
  const userIds = Object.keys(props.users);
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
        <Typography component="h1" variant="h5" gutterBottom>
          Would You Rather
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center">
          Sign in
        </Typography>

        <Avatar
          className={classes.avatar}
          src={userId && props.users[userId].avatarURL}
        ></Avatar>

        <form className={classes.form} noValidate>
          <Select
            className={classes.select}
            value={selected}
            onChange={(event) => handleSelectionChanged(event)}
            variant="outlined"
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={-1} disabled>
              Select user
            </MenuItem>
            {userIds.map((id) => (
              <MenuItem value={id} key={id}>
                {id}
              </MenuItem>
            ))}
          </Select>

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
        </form>
      </div>
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
    users: users,
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
    width: 120,
    height: 120,
    margin: theme.spacing(6),
    backgroundColor: theme.palette.grey[500],
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  select: {
    width: "100%",
    textAlign: "center",
  },
  submit: {
    margin: theme.spacing(6, 0, 2),
  },
}));
