import React from "react";
import MasterListLayout from "../layouts/MasterListLayout";
import {
  Paper,
  List,
  ListItem,
  makeStyles,
  ListItemText,
  Typography,
} from "@material-ui/core";
import Item from "../components/Item";

const useStyles = makeStyles(theme => ({
  itemListContainer: {
    overflowY: "scroll",
    height: "100%",
    "& > header": {
      padding: theme.spacing(2),
      paddingBottom: theme.spacing(1),
    },
  },
  itemShowcase: {
    padding: theme.spacing(2),
    height: "100%",
  },
  emptyContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const inventory = [
  {
    id: "0001",
    quantity: 1,
  },
  {
    id: "0002",
    quantity: 1,
  },
  {
    id: "0003",
    quantity: 4,
  },
];

export default function Inventory() {
  const classes = useStyles();
  const [selected, setSelected] = React.useState(null);

  const handleSelection = invItem => setSelected(invItem);

  return (
    <MasterListLayout
      list={
        <ItemList
          inventory={inventory}
          selected={selected}
          onSelection={handleSelection}
        />
      }
      master={<ItemShowcase selected={selected} />}
    />
  );
}

function ItemList({ inventory, selected, onSelection }) {
  const classes = useStyles();
  return (
    <div className={classes.itemListContainer}>
      <header>
        <Typography variant="h5">Inventory</Typography>
      </header>
      <List>
        {inventory.map(invItem => (
          <Item
            key={invItem.id}
            invItem={invItem}
            onClick={e => onSelection(invItem)}
            selected={selected?.id === invItem.id}
            button
          />
        ))}
      </List>
    </div>
  );
}

function ItemShowcase({ selected }) {
  const classes = useStyles();

  if (!Boolean(selected)) {
    return (
      <div className={classes.emptyContainer}>
        <Typography variant="h4">Select an item</Typography>
      </div>
    );
  }

  return (
    <div className={classes.itemShowcase}>
      <header>
        <Typography align="center" variant="h4">
          {selected.name}👋🏻
        </Typography>
      </header>
    </div>
  );
}
