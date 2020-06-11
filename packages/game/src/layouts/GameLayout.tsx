import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const TITLE_SIZE = 50;
const FOOTER_SIZE = 70;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    display: "grid",
    gridTemplateRows: `${TITLE_SIZE}px auto ${FOOTER_SIZE}px`,
    "& > header": {
      padding: theme.spacing(3),
      backgroundColor: theme.palette.background.default,
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    "& > main": {
      // transform: "scaleY(-1)",
      // "& > *": {
      //   transform: "scaleY(-1)",
      // },
      // display: "flex",
      // flexDirection: "column",
      // overflow: "scroll",
    },
  },
}));

type GameLayoutProps = {
  appBar: JSX.Element;
  main: JSX.Element;
};

export default function GameLayout({ appBar, main }: GameLayoutProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <header>{appBar}</header>
      <main>{main}</main>
    </div>
  );
}
