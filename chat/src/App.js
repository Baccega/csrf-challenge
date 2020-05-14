import React from "react";

import { Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import BigBullet from "@material-ui/icons/FiberManualRecord";

import ChatLayout from "./ChatLayout";
import ChatInput from "./ChatInput";
import ChatMessagges from "./ChatMessagges";

export default function App() {
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleMessageChange = (event) => setMessage(event.target.value);
  const handleMessageSend = async (event) => {
    event.preventDefault();
    if (!loading) {
      setLoading(true);
      const composedMessage = {
        text: message,
        sender: "me",
      };
      setMessages((prev) => [composedMessage, ...prev]);
      setMessage("");

      try {
        const res = await fetch("http://localhost:3000/chat/gary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(composedMessage),
        });
        const response = await res.text();
        const responseMessage = {
          text: response,
          sender: "gary",
        };
        setMessages((prev) => [responseMessage, ...prev]);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
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
          loading={loading}
          message={message}
          onMessageSend={handleMessageSend}
          onMessageChange={handleMessageChange}
        />
      }
    />
  );
}
