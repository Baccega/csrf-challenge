import React from "react";
import {
  ListItem,
  makeStyles,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  Typography,
} from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import { FaUser } from "react-icons/fa";
import BigBullet from "@material-ui/icons/FiberManualRecord";

import { InventoryItem } from "@csrf-challenge/common/src/Item";
import { ItemsList } from "../assets/ItemsList";
import { Friend } from "../assets/friendsList";

const useStyles = makeStyles(theme => ({
  itemListContainer: {
    overflowY: "scroll",
    height: "100%",
  },
  itemShowcase: {},
}));

type FriendProps = {
  friend: Friend;
  selected: boolean;
  onSelect: (friend: Friend) => void;
};

export default function FriendListItem({
  friend,
  onSelect,
  ...rest
}: FriendProps) {
  const classes = useStyles();

  const handleClick = () => {
    onSelect(friend);
  };

  return (
    <ListItem
      button
      disabled={!friend.online}
      onClick={handleClick}
      key={friend.name}
      {...rest}
    >
      <ListItemAvatar>
        <Avatar>
          <FaUser />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={friend.name} />
      <ListItemSecondaryAction>
        <BigBullet
          fontSize="small"
          style={{ color: friend.online ? green[500] : red[900] }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}
