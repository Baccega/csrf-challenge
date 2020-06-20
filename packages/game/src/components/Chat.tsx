import React from "react";
import Message from "@csrf-challenge/common/src/Message";
import classnames from "classnames";
import { makeStyles } from "@material-ui/core";

import { Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import BigBullet from "@material-ui/icons/FiberManualRecord";

import ChatLayout from "../layouts/ChatLayout";
import ChatInput from "../components/ChatInput";
import { sendMessageApi } from "../api/endpoints";
import { GARY_USERNAME } from "@csrf-challenge/common/src/costants";

const useStyles = makeStyles(theme => ({
  listRoot: {
    "& > header": {
      padding: theme.spacing(2),
      paddingBottom: theme.spacing(1),
    },
  },
  messageContainer: {
    width: "100%",
    display: "flex",
    padding: theme.spacing(1),
  },
  belongsToMe: {
    justifyContent: "flex-end",
  },
  message: {
    backgroundColor: theme.palette.secondary.dark,
    padding: theme.spacing(2),
    borderRadius: "1.5em 1.5em 1.5em 0px",
  },
  belongsToMeMessages: {
    backgroundColor: theme.palette.primary.dark,
    borderRadius: "1.5em 1.5em 0px 1.5em",
  },
}));

const EMPTY_MESSAGE: Message = {
  sender: "me",
  text: "",
};

export default function Chat() {
  const classes = useStyles();

  const [message, setMessage] = React.useState<Message>(EMPTY_MESSAGE);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleMessageTextChange = event => {
    const text = event.target.value;
    setMessage(cur => ({ ...cur, text }));
  };

  const handleMessageSend = async e => {
    e.preventDefault();
    setLoading(true);
    setMessages(cur => [message, ...cur]);
    setMessage(EMPTY_MESSAGE);
    try {
      const response = await sendMessageApi(message);
      if (response.data) {
        setMessages(cur => [response.data, ...cur]);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ChatLayout
      title={
        <>
          <BigBullet fontSize="small" style={{ color: green[500] }} />
          <Typography variant="h6">{GARY_USERNAME}</Typography>
        </>
      }
      chatMessagges={
        <>
          {messages.map((message, index) => (
            <div
              key={"message-" + index}
              className={classnames(
                classes.messageContainer,
                message.sender === "me" && classes.belongsToMe
              )}
            >
              <div
                className={classnames(
                  classes.message,
                  message.sender === "me" && classes.belongsToMeMessages
                )}
              >
                <div />
                <Typography variant="body2">{message.text}</Typography>
              </div>
            </div>
          ))}
        </>
      }
      chatInput={
        <ChatInput
          loading={loading}
          message={message}
          onMessageSend={handleMessageSend}
          onMessageTextChange={handleMessageTextChange}
        />
      }
    />
  );
}
