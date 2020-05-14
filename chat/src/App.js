import React from "react";

import { Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import BigBullet from "@material-ui/icons/FiberManualRecord";

import ChatLayout from "./ChatLayout";
import ChatInput from "./ChatInput";
import ChatMessagges from "./ChatMessagges";

export default function App() {
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([
    {
      sender: "me",
      text: "From me",
      // date: Date.now()
    },
    {
      sender: "gary",
      text: "Test message 2",
      // date: Date.now()
    },
  ]);

  const handleMessageChange = (event) => setMessage(event.target.value);
  const handleMessageSend = (event) => {
    event.preventDefault();
    const composedMessage = {
      text: message,
      sender: "me",
    };
    //TODO send backend
    setMessages((prev) => [composedMessage, ...prev]);
    setMessage("");
  };

  return (
    <ChatLayout
      title={
        <>
          <BigBullet fontSize="small" style={{ color: green[500] }} />
          <Typography variant="h6">Gary</Typography>
        </>
      }
      chatMessagges={<ChatMessagges messages={messages} />}
      chatInput={
        <ChatInput
          message={message}
          onMessageSend={handleMessageSend}
          onMessageChange={handleMessageChange}
        />
      }
    />
  );
}
