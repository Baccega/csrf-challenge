import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Dashboard from "./Dashboard";
import Inventory from "./Inventory";
import Profile from "./Profile";

import GameLayout from "../layouts/GameLayout";
import { isUserAuthenticated } from "../utils/auth";
import Appbar from "../components/Appbar";

export default function Game() {
  const authenticated = isUserAuthenticated();
  return (
    <GameLayout
      appBar={<Appbar />}
      main={
        <Switch>
          <Route path="/" exact>
            <Redirect to="/game/dashboard" />
          </Route>
          <Route path="/game/dashboard">
            <Dashboard />
          </Route>
          <Route path="/game/inventory">
            <Inventory />
          </Route>
          <Route path="/game/profile">
            <Profile />
          </Route>
          <Route>
            <Redirect to="/game/dashboard" />
          </Route>
        </Switch>
      }
    />
  );
}
