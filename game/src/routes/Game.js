import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Dashboard from "./Dashboard";

import GameLayout from "../layouts/GameLayout";
import { isUserAuthenticated } from "../utils/auth";

export default function Game() {
  const authenticated = isUserAuthenticated();
  return (
    <GameLayout
      appBar={<>ISAuth: {authenticated}</>}
      main={
        <Switch>
          <Route path="/game/dashboard" component={Dashboard} />
          <Route render={() => <Redirect to="/game/dashboard" />} />
        </Switch>
      }
    />
  );
}
