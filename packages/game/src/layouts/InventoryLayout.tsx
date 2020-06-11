import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const TITLE_SIZE = 50;
const FOOTER_SIZE = 70;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gridTemplateAreas: "'itemList itemShowcase'",
    [theme.breakpoints.down("sm")]: {
      gridTemplateAreas: "'itemList itemList' 'itemShowcase itemShowcase'",
    },
  },
  itemList: {
    padding: theme.spacing(2),
    gridArea: "itemList",
  },
  itemShowcase: {
    padding: theme.spacing(2),
    gridArea: "itemShowcase",
  },
}));

type InventoryLayoutProps = {
  itemList: JSX.Element;
  itemShowcase: JSX.Element;
};

export default function InventoryLayout({ itemList, itemShowcase }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.itemList}>{itemList}</div>
      <div className={classes.itemShowcase}>{itemShowcase}</div>
    </div>
  );
}
