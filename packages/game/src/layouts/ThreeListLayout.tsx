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
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateAreas: "'first second third'",
    gridGap: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      gridTemplateAreas: "'first first' 'second second' 'third third'",
    },
  },
  first: {
    height: "100%",
    gridArea: "first",
  },
  second: {
    height: "100%",
    gridArea: "second",
  },
  third: {
    height: "100%",
    gridArea: "third",
  },
}));

type ThreeListLayoutProps = {
  first: JSX.Element;
  second: JSX.Element;
  third: JSX.Element;
};

export default function ThreeListLayout({
  first,
  second,
  third,
}: ThreeListLayoutProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.first}>{first}</Paper>
      <Paper className={classes.second}>{second}</Paper>
      <Paper className={classes.third}>{third}</Paper>
    </div>
  );
}
