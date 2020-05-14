import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "auto 32px",
    gridGap: theme.spacing(1),
  },
}));

export default function ChatInput({ message, onMessageChange, onMessageSend }) {
  const classes = useStyles();

  return (
    <form className={classes.root} onSubmit={onMessageSend}>
      <TextField
        placeholder="Message"
        className={classes.input}
        variant="outlined"
        value={message}
        onChange={onMessageChange}
        autoFocus
        margin="dense"
      />
      <IconButton
        type="submit"
        disabled={message === ""}
        className={classes.sendButton}
      >
        <SendIcon />
      </IconButton>
    </form>
  );
}
