const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const SERVER_PORT = 3000;
const GAME_PORT = 5501;
const CHAT_PORT = 5501;

const urlExpression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
const urlRegexp = new RegExp(urlExpression);

app.use(cors());
app.use(bodyParser.json({ limit: "5mb" }));

app.get("/", (req, res) => res.send("Server ready"));

app.post("/chat/gary", (req, res) => {
  try {
    const { text } = req.body;
    if (text.match(urlRegexp)) {
      res.send("Visiting url");
    } else {
      res.send("Normal message");
    }
  } catch (e) {
    console.error(e);
  }
});

app.listen(SERVER_PORT, () =>
  console.log(`Server ready at http://localhost:${SERVER_PORT}`)
);
