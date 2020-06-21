import React, { FormEvent, ChangeEvent } from "react";
import Message from "@csrf-challenge/common/dist/Message";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "auto 32px",
    gridGap: theme.spacing(1),
  },
  input: {},
}));

interface ChatInputProps {
  message: Message;
  loading: boolean;
  onMessageTextChange: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onMessageSend: (e: FormEvent<HTMLFormElement>) => void;
}

export default function ChatInput({
  message,
  loading,
  onMessageTextChange,
  onMessageSend,
}: ChatInputProps) {
  const classes = useStyles();

  return (
    <form className={classes.root} onSubmit={onMessageSend}>
      <TextField
        placeholder="Message"
        // className={classes.input}
        variant="outlined"
        value={message.text}
        onChange={onMessageTextChange}
        autoFocus
        margin="dense"
      />
      <IconButton
        type="submit"
        disabled={message.text === "" || loading}
        // className={classes.sendButton}
      >
        <SendIcon />
      </IconButton>
    </form>
  );
}
