import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

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
      gridTemplateAreas:
        "'first first first' 'second second second' 'third third third'",
    },
  },
  first: {
    height: "100%",
    minHeight: 400,
    gridArea: "first",
  },
  second: {
    height: "100%",
    minHeight: 400,
    gridArea: "second",
  },
  third: {
    height: "100%",
    minHeight: 400,
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
