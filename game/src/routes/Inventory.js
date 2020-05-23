import React from "react";
import InventoryLayout from "../layouts/InventoryLayout";
import {
  Paper,
  List,
  ListItem,
  makeStyles,
  ListItemText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  itemListContainer: {
    overflowY: "scroll",
    height: "100%",
  },
  itemShowcase: {},
}));

const items = [
  {
    id: "0001",
    name: "Small sword",
    description: "A simple small sword",
  },
  {
    id: "0002",
    name: "Small staff",
    description: "A simple small staff",
  },
  {
    id: "0003",
    name: "Small shield",
    description: "A simple small shield",
  },
];

export default function Inventory() {
  const classes = useStyles();
  const [selected, setSelected] = React.useState(null);

  const handleSelection = (item) => setSelected(item);

  return (
    <InventoryLayout
      itemList={
        <ItemList
          items={items}
          selected={selected}
          onSelection={handleSelection}
        />
      }
      itemShowcase={"itemShowcase"}
    />
  );
}

function ItemList({ items, selected, onSelection }) {
  const classes = useStyles();
  return (
    <Paper className={classes.itemListContainer}>
      <List>
        {items.map((item) => (
          <ListItem
            key={item.id}
            onClick={(e) => onSelection(item)}
            selected={selected?.id === item.id}
            button
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
