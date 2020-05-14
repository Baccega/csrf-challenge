import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const TITLE_SIZE = 50;
const FOOTER_SIZE = 70;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    display: "grid",
    gridTemplateRows: `${TITLE_SIZE}px auto ${FOOTER_SIZE}px`,
    "& > header": {
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
      display: "flex",
      alignItems: "center",
      borderBottom: `1px solid ${theme.palette.divider}`,
      "& > *": {
        marginRight: theme.spacing(1),
      },
    },
    "& > main": {
      padding: `${theme.spacing(2)}px ${theme.spacing(1)}px 0px ${theme.spacing(
        1
      )}px`,
      transform: "scaleY(-1)",
      "& > *": {
        transform: "scaleY(-1)",
      },
      display: "flex",
      flexDirection: "column",
      overflow: "scroll",
    },
    "& > footer": {
      padding: theme.spacing(1),
      borderTop: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.background.paper,
    },
  },
}));

export default function ChatLayout({ title, chatMessagges, chatInput }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <header>{title}</header>
      <main>{chatMessagges}</main>
      <footer>{chatInput}</footer>
    </div>
  );
}
