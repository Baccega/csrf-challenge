import React from "react";
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";

import { CircularProgress } from "@material-ui/core";
import { signUpApi } from "../api/endpoints";

const useStyles = makeStyles(theme => ({
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
    height: "500px",
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

export default function Signup() {
  const classes = useStyles();
  const history = useHistory();

  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
    verifyPassword: "",
  });
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleLoginFormChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async e => {
    e.preventDefault();
    if (formData.password !== formData.verifyPassword) {
      setError(true);
    } else {
      setError(null);
      setLoading(true);
      const result = await signUpApi({
        username: formData.username,
        password: formData.password,
      });
      localStorage.setItem("b64Token", result.data.encodedToken);
      setLoading(false);
      if (result.status === "ok") {
        history.push("/game/dashboard");
      } else {
        setError(true);
      }
    }
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <Paper className={classes.formContainer}>
          <Typography variant="h5">Sign up</Typography>
          <div className="fieldsContainer">
            <TextField
              fullWidth
              margin="none"
              className={classes.formField}
              variant="outlined"
              name="username"
              placeholder="Username"
              label="Username"
              value={formData.username}
              onChange={handleLoginFormChange}
            />
            <TextField
              fullWidth
              margin="none"
              className={classes.formField}
              variant="outlined"
              name="password"
              placeholder="Password"
              label="Password"
              value={formData.password}
              onChange={handleLoginFormChange}
              type="password"
            />
            <TextField
              fullWidth
              margin="none"
              className={classes.formField}
              variant="outlined"
              name="verifyPassword"
              placeholder="Verify password"
              label="Verify password"
              value={formData.verifyPassword}
              onChange={handleLoginFormChange}
              type="password"
            />
            {error && (
              <Alert severity="error">
                Username already taken or invalid password verification
              </Alert>
            )}
            {loading && <CircularProgress color="secondary" />}
          </div>
          <div className="buttonsContainer">
            {loading}
            <Button
              variant="outlined"
              color="secondary"
              component={Link}
              to="/login"
            >
              Sign In
            </Button>
            <Button
              type="submit"
              disabled={
                loading ||
                formData.password.length === 0 ||
                formData.username.length === 0
              }
              variant="outlined"
              color="primary"
            >
              Sign up
            </Button>
          </div>
        </Paper>
      </form>
    </div>
  );
}
