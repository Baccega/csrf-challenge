import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import ep from "./safeEndpoints";
import { Message } from "@csrf-challenge/common/src";
import getRandomGaryMessage from "./garyMessagges";

const urlExpression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
const urlRegexp = new RegExp(urlExpression);

export default function createHttpApi() {
  const app = express();
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(cors());

  ep(app, "POST /chat", async (req, res) => {
    try {
      const userMessage = req.body.text;
      const message = getRandomGaryMessage(userMessage.match(urlRegexp));

      res.status(200).send({ status: "ok", data: message, error: null });
    } catch (e) {
      res.status(500).send({ status: "error", data: null, error: "Error" });
    }
  });

  return app;
}
