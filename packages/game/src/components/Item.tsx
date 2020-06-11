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
import { itemsList } from "../assets/itemList";

const useStyles = makeStyles(theme => ({
  itemListContainer: {
    overflowY: "scroll",
    height: "100%",
  },
  itemShowcase: {},
}));

export default function Item({ invItem, ...rest }) {
  const classes = useStyles();
  const item = itemsList.find(i => i.id === invItem.id);

  if (!Boolean(item)) {
    return null;
  }

  return (
    <ListItem key={invItem.id} {...rest}>
      <ListItemAvatar>
        <Avatar>{item.icon}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={item.name} />
      <ListItemSecondaryAction>
        <Typography variant="body1">x{invItem.quantity}</Typography>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
