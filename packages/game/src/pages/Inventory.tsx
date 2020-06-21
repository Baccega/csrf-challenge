import React from "react";
import MasterListLayout from "../layouts/MasterListLayout";
import {
  List,
  Avatar,
  makeStyles,
  Typography,
  LinearProgress,
  IconButton,
} from "@material-ui/core";
import Item from "../components/Item";
import { INVENTORY_SIZE } from "@csrf-challenge/common/dist/costants";
import getItemIcon from "../assets/itemsIcons";
import { IconContext } from "react-icons/lib";
import { useRefreashableRemoteData } from "../api/hooks";
import { IoMdRefresh } from "react-icons/io";

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
  spaced: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

export default function Inventory() {
  // const classes = useStyles();
  const [selected, setSelected] = React.useState(null);

  const inventoryData = useRefreashableRemoteData("GET /inventory");

  const handleSelection = React.useCallback(
    (invItem, index) => setSelected({ ...invItem, index }),
    [setSelected]
  );

  return (
    <MasterListLayout
      list={
        <ItemList
          inventoryData={inventoryData}
          selected={selected}
          onSelection={handleSelection}
        />
      }
      master={<ItemShowcase selected={selected} />}
    />
  );
}

// Lazy + no time
export function ItemList({ inventoryData, selected, onSelection }) {
  const classes = useStyles();

  const { data, onReload, loading } = inventoryData;
  const inventory = data;

  if (inventory == null) {
    return (
      <div className={classes.itemListContainer}>
        <LinearProgress />
      </div>
    );
  }

  return (
    <div className={classes.itemListContainer}>
      {loading && <LinearProgress />}
      <header>
        <div className={classes.spaced}>
          <Typography variant="h5">Inventory</Typography>
          <IconButton onClick={onReload}>
            <IoMdRefresh />
          </IconButton>
        </div>
        <Typography variant="caption">
          {data?.length}/{INVENTORY_SIZE}
        </Typography>
      </header>
      <List>
        {data?.map((item, index) => (
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
