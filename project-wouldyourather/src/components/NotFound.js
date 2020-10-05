import React, { useState } from "react";
import { Typography, Button, makeStyles } from "@material-ui/core";
import { Redirect } from "react-router-dom";

const NotFound = () => {
  const [toHome, setToHome] = useState(false);
  const classes = useStyles();

  if (toHome === true) {
    return <Redirect to="/" />;
  }

  return (
    <div align="center">
      <Typography variant="h1">404</Typography>
      <Typography variant="h4" gutterBottom>
        UH OH! You're lost.
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        The page you are looking for does not exist but you can click the button
        below to go back to the homepage.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => setToHome(true)}
      >
        Home
      </Button>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(3),
  },
}));
export default NotFound;
