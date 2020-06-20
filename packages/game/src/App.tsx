import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { useUserAuthentication } from "./utils";

import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Game from "./pages/Game";
import Signup from "./pages/Signup";

function RedirectToLogin(props) {
  return <Redirect to={{ pathname: "/login" }} />;
}

function ProtectedRoute(props) {
  const { authenticated, children, ...rest } = props;

  return <Route {...rest}>{authenticated ? children : RedirectToLogin}</Route>;
}

export default function App() {
  const { authenticated } = useUserAuthentication();

  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/login" />
      </Route>
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/signup" component={Signup} />
      <ProtectedRoute authenticated={authenticated}>
        <Route path="/game" component={Game} />
      </ProtectedRoute>
      <Route>
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
}
