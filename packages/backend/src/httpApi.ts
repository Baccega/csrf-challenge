import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import ep from "./safeEndpoints";
import { Message } from "@csrf-challenge/common/src";
import getRandomGaryMessage from "./garyMessagges";
import authenticated from "./authenticated";

const urlExpression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
const urlRegexp = new RegExp(urlExpression);

export default function createHttpApi() {
  const app = express();
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(cors());

  // --- AUTH
  ep(app, "POST /login", async (req, res) => {
    // try {
    //   const userMessage = req.body.text;
    //   const message = getRandomGaryMessage(userMessage.match(urlRegexp));
    //   res.status(200).send({ status: "ok", data: message, error: null });
    // } catch (e) {
    //   res.status(500).send({ status: "error", data: null, error: "Error" });
    // }
  });

  ep(app, "POST /logout", async (req, res) => {
    // try {
    //   const userMessage = req.body.text;
    //   const message = getRandomGaryMessage(userMessage.match(urlRegexp));
    //   res.status(200).send({ status: "ok", data: message, error: null });
    // } catch (e) {
    //   res.status(500).send({ status: "error", data: null, error: "Error" });
    // }
  });

  // --- CHAT
  ep(app, "POST /chat", authenticated, async (req, res) => {
    try {
      console.log("username", req.username);
      const userMessage = req.body.text;
      const message = getRandomGaryMessage(
        userMessage.includes("http://")
        // && userMessage.match(urlRegexp)
      );

      res.status(200).send({ status: "ok", data: message, error: null });
    } catch (e) {
      res.status(500).send({ status: "error", data: null, error: "Error" });
    }
  });

  return app;
}
