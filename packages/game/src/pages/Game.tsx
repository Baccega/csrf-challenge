import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Dashboard from "./Dashboard";
import Inventory from "./Inventory";
import Profile from "./Profile";
import Friends from "./Friends";

import GameLayout from "../layouts/GameLayout";
import { isUserAuthenticated } from "../utils";
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
          <Route path="/game/friends">
            <Friends />
          </Route>
          <Route>
            <Redirect to="/game/dashboard" />
          </Route>
        </Switch>
      }
    />
  );
}