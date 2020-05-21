import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { isUserAuthenticated } from "./utils/auth";

import Login from "./routes/Login";
import Logout from "./routes/Logout";
import Game from "./routes/Game";

function RedirectToLogin(props) {
  return <Redirect to={{ pathname: "/login" }} />;
}

function ProtectedRoute(props) {
  const { authenticated, children, ...rest } = props;

  return <Route {...rest}>{authenticated ? children : RedirectToLogin}</Route>;
}

export default function App() {
  const authenticated = isUserAuthenticated();

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/signup" component={Logout} />
      <ProtectedRoute authenticated={authenticated}>
        <Route path="/game" component={Game} />
      </ProtectedRoute>
      <Route render={() => <Redirect to="/login" />} />
    </Switch>
  );
}
