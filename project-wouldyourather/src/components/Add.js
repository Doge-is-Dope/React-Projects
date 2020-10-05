import React, { useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  Grid,
  TextField,
  Button,
  makeStyles,
  Container,
  Typography,
} from "@material-ui/core";

import { handleAddQuestion } from "../actions/questions";

const Add = (props) => {
  const classes = useStyles();
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const authedUser = useSelector((state) => state.authedUser);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { history } = props;

    if (optionOne && optionTwo) {
      // console.log(`option 1: ${optionOne}`);
      // console.log(`option 2: ${optionTwo}`);
      dispatch(
        handleAddQuestion({
          optionOneText: optionOne,
          optionTwoText: optionTwo,
          authedUser,
        })
      );
    }
    history.push("/");
  };

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create New Question
        </Typography>

        <Typography
          variant="h6"
          color="textSecondary"
          className={classes.subTitle}
        >
          Would you rather...
        </Typography>

        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Option One"
                id="optionOne"
                name="optionOne"
                onChange={(e) => setOptionOne(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" color="textSecondary" align="center">
                or
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="optionTwo"
                label="Option Two"
                name="optionTwo"
                onChange={(e) => setOptionTwo(e.target.value)}
              />
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={optionOne === "" || optionTwo === ""}
            >
              Submit
            </Button>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(Add);

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  subTitle: {
    marginTop: theme.spacing(3),
    alignSelf: "flex-start",
  },
  title: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
