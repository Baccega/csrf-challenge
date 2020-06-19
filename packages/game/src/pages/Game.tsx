import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Dashboard from "./Dashboard";
import Inventory from "./Inventory";
import Send from "./Send";
import Friends from "./Friends";

import GameLayout from "../layouts/GameLayout";
import Appbar from "../components/Appbar";
import { useRemoteData } from "../api/hooks";

export default function Game() {
  const inventory = useRemoteData("GET /inventory", { params: {}, body: {} });

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
            <Inventory inventory={inventory} />
          </Route>
          <Route path="/game/send-item">
            <Send inventory={inventory} />
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
