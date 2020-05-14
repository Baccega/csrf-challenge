import React from "react";
import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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

export default function ChatMessagges({ messages }) {
  const classes = useStyles();

  return (
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
            <div className={classes.decorator} />
            <Typography variant="body2">{message.text}</Typography>
          </div>
        </div>
      ))}
    </>
  );
}
