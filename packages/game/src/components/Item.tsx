import React from "react";
import {
  ListItem,
  // makeStyles,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import getItemIcon from "../assets/itemsIcons";

// const useStyles = makeStyles(theme => ({
//   itemListContainer: {
//     overflowY: "scroll",
//     height: "100%",
//   },
//   itemShowcase: {},
// }));

export default function Item({ item, ...rest }) {
  // const classes = useStyles();

  if (!Boolean(item)) {
    return null;
  }

  return (
    <ListItem key={item.id} {...rest}>
      <ListItemAvatar>
        <Avatar>{getItemIcon(item.id)}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={item.name} />
    </ListItem>
  );
}
