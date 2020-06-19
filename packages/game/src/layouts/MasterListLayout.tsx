import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

const TITLE_SIZE = 50;
const FOOTER_SIZE = 70;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "grid",
    padding: theme.spacing(2),
    gridTemplateColumns: "1fr 2fr",
    gridTemplateAreas: "'list master'",
    gridGap: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      gridTemplateAreas: "'list list' 'master master'",
    },
  },
  list: {
    height: "100%",
    gridArea: "list",
  },
  master: {
    height: "100%",
    gridArea: "master",
  },
}));

type MasterListLayoutProps = {
  list: JSX.Element;
  master: JSX.Element;
};

export default function MasterListLayout({
  list,
  master,
}: MasterListLayoutProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.list}>{list}</Paper>
      <Paper className={classes.master}>{master}</Paper>
    </div>
  );
}
