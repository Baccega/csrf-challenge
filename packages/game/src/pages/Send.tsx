import React from "react";
import { makeStyles, List, Button, CircularProgress } from "@material-ui/core";
import { Typography } from "@material-ui/core";

import { FriendsList, Friend } from "../assets/friendsList";

import ThreeListLayout from "../layouts/ThreeListLayout";
import FriendListItem from "../components/FriendListItem";
import { ItemList } from "./Inventory";
import { sendItemApi } from "../api/endpoints";
import { useRefreashableRemoteData } from "../api/hooks";

const useStyles = makeStyles(theme => ({
  listRoot: {
    "& > header": {
      padding: theme.spacing(2),
      paddingBottom: theme.spacing(1),
    },
  },
  emptyContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Send() {
  const classes = useStyles();

  const [selectedFriend, setSelectedFriend] = React.useState<Friend>(null);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const inventoryData = useRefreashableRemoteData("GET /inventory");

  const handleSelectFriend = friend => {
    if (!loading) {
      setSelectedFriend(friend);
    }
  };
  const handleSelectItem = (item, index) => {
    if (!loading) {
      setSelectedItem({ ...item, index });
    }
  };
  const handleSend = async () => {
    setLoading(true);
    const token = localStorage.getItem("b64Token");
    await sendItemApi(selectedFriend.name, selectedItem.index, token);
    inventoryData.onReload();
    setLoading(false);
  };

  const noFriendSelected = (
    <div className={classes.emptyContainer}>
      <Typography variant="h4">Select a Friend</Typography>
    </div>
  );

  const noItemSelected = (
    <div className={classes.emptyContainer}>
      <Typography variant="h4">Select an Item</Typography>
    </div>
  );

  const sendButton = (
    <div className={classes.emptyContainer}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Button size="large" variant="outlined" onClick={handleSend}>
          Send item to {selectedFriend?.name}
        </Button>
      )}
    </div>
  );

  return (
    <ThreeListLayout
      first={
        <div className={classes.listRoot}>
          <header>
            <Typography variant="h5">Friends</Typography>
          </header>
          <List>
            {FriendsList.map(friend => (
              <FriendListItem
                alwaysEnabled={true}
                key={friend.name}
                friend={friend}
                selected={friend.name === selectedFriend?.name}
                onSelect={handleSelectFriend}
              />
            ))}
          </List>
        </div>
      }
      second={
        selectedFriend ? (
          <ItemList
            inventoryData={inventoryData}
            onSelection={handleSelectItem}
            selected={selectedItem}
          />
        ) : (
          noFriendSelected
        )
      }
      third={
        selectedFriend
          ? selectedItem
            ? sendButton
            : noItemSelected
          : noFriendSelected
      }
    />
  );
}
