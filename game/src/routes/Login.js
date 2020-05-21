import React from "react";
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";

import { login, isUserAuthenticated } from "../utils/auth";
import { CircularProgress } from "@material-ui/core";

const TITLE_SIZE = 50;
const FOOTER_SIZE = 70;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    padding: theme.spacing(4),
    width: "300px",
    height: "400px",
    display: "grid",
    gridTemplateRows: "70px auto 50px",
    "& > .fieldsContainer": {
      "& > *": {
        marginBottom: theme.spacing(2),
      },
    },
    "& > .buttonsContainer": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
  formField: {},
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();

  const [loginFormData, setLoginFormData] = React.useState({
    username: "",
    password: "",
  });
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleLoginFormChange = (e) =>
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await login(loginFormData);
    setLoading(false);
    if (result && isUserAuthenticated()) {
      handleAuthenticationComplete();
    } else {
      setError(true);
    }
  };

  const handleAuthenticationComplete = () => {
    history.push("/game/dashboard");
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <Paper className={classes.formContainer}>
          <Typography variant="h5">Game</Typography>
          <div className="fieldsContainer">
            <TextField
              fullWidth
              margin="none"
              className={classes.formField}
              variant="outlined"
              name="username"
              placeholder="Username"
              label="Username"
              value={loginFormData.username}
              onChange={handleLoginFormChange}
            />
            <TextField
              fullWidth
              margin="none"
              className={classes.formField}
              variant="outlined"
              name="password"
              placeholder="Pass"
              label="Pass"
              value={loginFormData.password}
              onChange={handleLoginFormChange}
              type="password"
            />
            {error && <Alert severity="error">Login failed</Alert>}
            {loading && <CircularProgress color="secondary" />}
          </div>
          <div className="buttonsContainer">
            {loading}
            <Button
              // onClick={() => console.log("signup")}
              variant="outlined"
              color="secondary"
              component={Link}
              to="/signup"
            >
              Sign up
            </Button>
            <Button
              type="submit"
              disabled={loading}
              variant="outlined"
              color="primary"
            >
              Sign in
            </Button>
          </div>
        </Paper>
      </form>
    </div>
  );
}
