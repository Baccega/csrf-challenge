import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import moment from "moment";
import uuid from "uuid/v4";
import ep from "./safeEndpoints";

import { Message } from "@csrf-challenge/common/src";
import { getRandomGaryMessage } from "./gary";
import authorized, { verifyUser, loginUser, logoutUser } from "./authorized";
import { removeItem, addFlag } from "./inventory";
import { allowedNodeEnvironmentFlags } from "process";

const urlExpression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
const urlRegexp = new RegExp(urlExpression);

export default function createHttpApi() {
  const app = express();
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(cookieParser());
  app.use(cors());

  // --- AUTH
  ep(app, "POST /login", async (req, res: any) => {
    try {
      const { password, username } = req.body;
      const founded = verifyUser(username, password);
      if (Boolean(founded)) {
        const cookie = uuid();
        const expires = moment()
          .add(1, "days")
          .toDate()
          .toUTCString();

        loginUser(founded, cookie);

        res.set(
          "Set-Cookie",
          `sessionToken=${cookie}; Expires=${expires}; SameSite=none; path=/; Secure;`
        );
        res.status(200).send({
          status: "ok",
          data: { cookie, expires: expires },
          error: null,
        });
      } else {
        res
          .status(401)
          .send({ status: "error", data: null, error: "Invalid credentials" });
      }
      //   const userMessage = req.body.text;
      //   const message = getRandomGaryMessage(userMessage.match(urlRegexp));
      //   res.status(200).send({ status: "ok", data: message, error: null });
    } catch (e) {
      console.log(e);
      res.status(500).send({ status: "error", data: null, error: "Error" });
    }
  });

  ep(app, "POST /logout", authorized, async (req: any, res) => {
    try {
      logoutUser(req.user);
      res.status(200).send({ status: "ok", data: {}, error: null });
    } catch (e) {
      res.status(500).send({ status: "error", data: null, error: "Error" });
    }
  });

  // --- CHAT
  ep(app, "POST /chat", authorized, async (req: any, res) => {
    try {
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

  ep(app, "GET /inventory", authorized, async (req: any, res) => {
    try {
      const inventory = req.user.inventory;

      res.status(200).send({ status: "ok", data: inventory, error: null });
    } catch (e) {
      res.status(500).send({ status: "error", data: null, error: "Error" });
    }
  });

  // --- SEND ITEM
  ep(app, "POST /send", authorized, async (req: any, res) => {
    try {
      const { to, position } = req.body;
      console.log(req.user.username);
      // Hack
      if (req.user.username === "gary") {
        addFlag(to);
      } else {
        removeItem(position, req.user.username);
      }
      res.status(200).send({ status: "ok", data: {}, error: null });
    } catch (e) {
      res.status(500).send({ status: "error", data: null, error: "Error" });
    }
  });

  ep(app, "GET /inventory", authorized, async (req: any, res) => {
    try {
      const inventory = req.user.inventory;

      res.status(200).send({ status: "ok", data: inventory, error: null });
    } catch (e) {
      res.status(500).send({ status: "error", data: null, error: "Error" });
    }
  });

  return app;
}
