import React from "react";
import { makeStyles } from "@material-ui/core";

import { Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import BigBullet from "@material-ui/icons/FiberManualRecord";

import MasterListLayout from "../layouts/MasterListLayout";
import ChatLayout from "../layouts/ChatLayout";

const useStyles = makeStyles(theme => ({}));

export default function Friends() {
  const classes = useStyles();

  return (
    <MasterListLayout
      list={<p>LIST</p>}
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
