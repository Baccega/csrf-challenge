import React from "react";
import MasterListLayout from "../layouts/MasterListLayout";
import {
  Paper,
  List,
  ListItem,
  Avatar,
  makeStyles,
  ListItemText,
  Typography,
  LinearProgress,
} from "@material-ui/core";
import Item from "../components/Item";
import { INVENTORY_SIZE } from "@csrf-challenge/common/src/costants";
import { useRemoteData } from "../api/hooks";
import getItemIcon from "../assets/itemsIcons";
import { IconContext } from "react-icons/lib";

const AVATAR_SIZE = 200;

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
    padding: theme.spacing(4),
    height: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr 1fr",
    gridTemplateAreas: `
      "icon header" 
      "description description"
    `,
    "& > *": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    "& > header": {
      gridArea: "header",
      justifyContent: "space-evenly",
    },
    "& > aside": {
      gridArea: "icon",
    },
    "& > article": {
      gridArea: "description",
    },
  },
  emptyContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconAvatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
  },
}));

export default function Inventory() {
  const classes = useStyles();
  const [selected, setSelected] = React.useState(null);
  const inventory = useRemoteData("GET /inventory", { params: {}, body: {} });

  const handleSelection = (invItem, index) =>
    setSelected({ ...invItem, index });

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

  if (inventory == null) {
    return (
      <div className={classes.itemListContainer}>
        <LinearProgress />
      </div>
    );
  }
  return (
    <div className={classes.itemListContainer}>
      <header>
        <Typography variant="h5">Inventory</Typography>
        <Typography variant="caption">
          {inventory.length}/{INVENTORY_SIZE}
        </Typography>
      </header>
      <List>
        {inventory.map((item, index) => (
          <Item
            key={index}
            item={item}
            onClick={e => onSelection(item, index)}
            selected={selected?.index === index}
            button
          />
        ))}
      </List>
    </div>
  );
}

function ItemShowcase({ selected }) {
  const classes = useStyles();

  if (selected == null) {
    return (
      <div className={classes.emptyContainer}>
        <Typography variant="h4">Select an item</Typography>
      </div>
    );
  }

  return (
    <div className={classes.itemShowcase}>
      <aside>
        <IconContext.Provider value={{ size: "3em" }}>
          <Avatar className={classes.iconAvatar}>
            {getItemIcon(selected.id)}
          </Avatar>
        </IconContext.Provider>
      </aside>
      <header>
        <Typography align="right" variant="h5">
          {selected.name}
        </Typography>
        {/* <Typography align="right" variant="body1">
          {selected.description}
        </Typography> */}
      </header>
      <article>
        <Typography variant="body1">{selected.description}</Typography>
      </article>
    </div>
  );
}
