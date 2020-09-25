import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Container,
  Button,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core";

import { setAuthedUser } from "../../actions/authedUser";
import LoginHeader from "./LoginHeader";

const Login = (props) => {
  const [userId, setUserId] = useState("");
  const [toHome, setToHome] = useState(false);
  const styles = useStyles();

  const handleChange = (e) => {
    setUserId(e.target.value);
  };

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
        <LoginHeader />

        <Select value={userId} onChange={handleChange}>
          {props.users.map((id) => (
            <MenuItem key={id} value={id}>
              {id}
            </MenuItem>
          ))}
        </Select>

        <form onSubmit={handleSubmit}>
          <Button variant="contained" type="submit" disabled={userId === ""}>
            Login
          </Button>
        </form>
      </Container>
    </React.Fragment>
  );
};

const mapStateToProps = ({ users }) => {
  // console.log(`users: ${JSON.stringify(users)}`);
  return {
    users: Object.keys(users),
  };
};

const useStyles = makeStyles({
  root: {
    backgroundColor: "#cfe8fc",
    height: "50vh",
  },

  cardLogin: {
    margin: 20,
  },
});

export default connect(mapStateToProps)(Login);
