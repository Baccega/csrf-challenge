import React from "react";
import InventoryLayout from "../layouts/InventoryLayout";
import {
  Paper,
  List,
  ListItem,
  makeStyles,
  ListItemText,
  Typography,
} from "@material-ui/core";
import Item from "../components/Item";

const useStyles = makeStyles((theme) => ({
  itemListContainer: {
    overflowY: "scroll",
    height: "100%",
    "& > header": {
      padding: theme.spacing(2),
      paddingBottom: theme.spacing(1),
    },
  },
  itemShowcase: {},
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

  const handleSelection = (invItem) => setSelected(invItem);

  return (
    <InventoryLayout
      itemList={
        <ItemList
          inventory={inventory}
          selected={selected}
          onSelection={handleSelection}
        />
      }
      itemShowcase={"itemShowcase"}
    />
  );
}

function ItemList({ inventory, selected, onSelection }) {
  const classes = useStyles();
  return (
    <Paper className={classes.itemListContainer}>
      <header>
        <Typography variant="h5">Inventory</Typography>
      </header>
      <List>
        {inventory.map((invItem) => (
          <Item
            invItem={invItem}
            onClick={(e) => onSelection(invItem)}
            selected={selected?.id === invItem.id}
            button
          />
        ))}
      </List>
    </Paper>
  );
}
