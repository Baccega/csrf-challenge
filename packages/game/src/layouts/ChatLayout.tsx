import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const TITLE_SIZE = 64;
const FOOTER_SIZE = 70;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    // It aint ugly if it works
    height: `calc(100vh - 50px - ${16 * 2}px)`,
    overflow: "hidden",
    display: "grid",
    gridTemplateRows: `${TITLE_SIZE}px auto ${FOOTER_SIZE}px`,
    borderRadius: 8,
    "& > header": {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
      display: "flex",
      alignItems: "center",
      borderBottom: `1px solid ${theme.palette.divider}`,
      "& > *": {
        marginRight: theme.spacing(1),
      },
    },
    "& > section": {
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
      height: "100%",
    },
    "& > footer": {
      padding: theme.spacing(1),
      borderTop: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.background.paper,
    },
  },
}));

interface ChatLayoutProps {
  title: JSX.Element;
  chatMessagges: JSX.Element;
  chatInput: JSX.Element;
}

export default function ChatLayout({
  title,
  chatMessagges,
  chatInput,
}: ChatLayoutProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <header>{title}</header>
      <section>{chatMessagges}</section>
      <footer>{chatInput}</footer>
    </div>
  );
}
