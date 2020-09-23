import React, { useState } from "react";
import { connect } from "react-redux";
import { Container, Button, Select, makeStyles } from "@material-ui/core";

import { setAuthedUser } from "../../actions/authedUser";

const Login = (props) => {
  const [userId, setUserId] = useState("");
  const [toHome, setToHome] = useState(false);
  const styles = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { dispatch } = props;

    dispatch(setAuthedUser(userId));

    setUserId("");
    setToHome(userId ? false : true);
  };


  if (toHome === true) {
    // return <Redirect to="/" />;
  }

  return (
    <React.Fragment>
      <Container className={styles.root}>
        <h3>Welcome to the Would You Rather App!</h3>
        <p>Please sign in to continue</p>


        <Select>


        <form onSubmit={handleSubmit}>
          <Button variant="contained" type="submit" disabled={userId === ""}>
            Login
          </Button>
        </form>
      </Container>
    </React.Fragment>
  );
};

export default connect()(Login);

const useStyles = makeStyles({
  root: {
    backgroundColor: "#cfe8fc",
    height: "50vh",
  },

  cardLogin: {
    margin: 20,
  },
});
