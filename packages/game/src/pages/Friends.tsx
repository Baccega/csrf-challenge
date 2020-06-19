import React from "react";
import { makeStyles, List } from "@material-ui/core";

import { Typography } from "@material-ui/core";

import { FriendsList, Friend } from "../assets/friendsList";

import FriendListItem from "../components/FriendListItem";
import MasterListLayout from "../layouts/MasterListLayout";
import Chat from "../components/Chat";

const useStyles = makeStyles(theme => ({
  listRoot: {
    "& > header": {
      padding: theme.spacing(2),
      paddingBottom: theme.spacing(1),
    },
  },
  emptyContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Friends() {
  const classes = useStyles();

  const [selected, setSelected] = React.useState<Friend>(null);

  const handleSelect = friend => setSelected(friend);

  const noItemSelected = (
    <div className={classes.emptyContainer}>
      <Typography variant="h4">Select a Friend</Typography>
    </div>
  );

  return (
    <MasterListLayout
      list={
        <div className={classes.listRoot}>
          <header>
            <Typography variant="h5">Friends</Typography>
          </header>
          <List>
            {FriendsList.map(friend => (
              <FriendListItem
                key={friend.name}
                friend={friend}
                selected={friend.name === selected?.name}
                onSelect={handleSelect}
              />
            ))}
          </List>
        </div>
      }
      master={selected ? <Chat /> : noItemSelected}
    />
  );
}
