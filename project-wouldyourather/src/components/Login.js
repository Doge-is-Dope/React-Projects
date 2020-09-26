import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

import { setAuthedUser } from "../actions/authedUser";

const Login = (props) => {
  const [userId, setUserId] = useState(-1);
  const [toHome, setToHome] = useState(false);

  const handleSelectionChanged = (event) => {
    const userId = event.target.value;

    setUserId(userId);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const { dispatch } = props;

    dispatch(setAuthedUser(userId));

    setUserId(-1);
    setToHome(userId ? false : true);
  };

  if (toHome) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div>
        <h3>Welcome to the Would You Rather App!</h3>
        <p>Please sign in to continue</p>
      </div>

      <div>
        <select
          value={userId}
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
      </div>

      <button type="submit" disabled={userId === ""} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  // console.log(`users: ${JSON.stringify(users)}`);
  return {
    users: Object.keys(users),
  };
};
export default withRouter(connect(mapStateToProps)(Login));
