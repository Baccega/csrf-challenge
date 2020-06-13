import React from "react";
import { makeStyles, List } from "@material-ui/core";

import { Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import BigBullet from "@material-ui/icons/FiberManualRecord";

import { FriendsList } from "../assets/friendsList";

import FriendListItem from "../components/FriendListItem";
import MasterListLayout from "../layouts/MasterListLayout";
import ChatLayout from "../layouts/ChatLayout";

const useStyles = makeStyles(theme => ({
  listRoot: {
    "& > header": {
      padding: theme.spacing(2),
      paddingBottom: theme.spacing(1),
    },
  },
}));

export default function Friends() {
  const classes = useStyles();

  const [selected, setSelected] = React.useState("");

  const handleSelect = name => setSelected(name);

  return (
    <MasterListLayout
      list={
        <div className={classes.listRoot}>
          <header>
            <Typography variant="h5">Friends</Typography>
          </header>
          <List>
            {FriendsList.map(friend => (
              <FriendListItem
                friend={friend}
                selected={friend.name === selected}
                onSelect={handleSelect}
              />
            ))}
          </List>
        </div>
      }
      master={
        <ChatLayout
          title={
            <>
              <BigBullet fontSize="small" style={{ color: green[500] }} />
              <Typography variant="h6">Gary</Typography>
            </>
          }
          chatMessagges={<>MESSAGGES</>}
          chatInput={
            // <ChatInput
            //   loading={loading}
            //   message={message}
            //   onMessageSend={handleMessageSend}
            //   onMessageChange={handleMessageChange}
            // />
            <>INPUT</>
          }
        />
      }
    />
  );
}
