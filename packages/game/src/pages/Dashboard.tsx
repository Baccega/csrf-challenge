import React from "react";
import { makeStyles, List } from "@material-ui/core";

import { Typography } from "@material-ui/core";

import { FriendsList, Friend } from "../assets/friendsList";

import FriendListItem from "../components/FriendListItem";
import MasterListLayout from "../layouts/MasterListLayout";
import Chat from "../components/Chat";

const useStyles = makeStyles(theme => ({
  emptyContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  readable: {
    maxWidth: 400,
    "& > *": {
      marginBottom: theme.spacing(2),
    },
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.emptyContainer}>
      <div className={classes.readable}>
        <Typography align="center" variant="h5">
          Welcome to the Items Mailbox!
        </Typography>
        <Typography align="center" variant="h6">
          This is an extension of the game that allows you to chat with your
          in-game friends, as well as send items to them.
        </Typography>
      </div>
    </div>
  );
}
