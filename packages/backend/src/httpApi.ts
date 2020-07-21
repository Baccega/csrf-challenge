import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import moment from "moment";
import uuid from "uuid/v4";
import ep from "./safeEndpoints";

import { Message } from "@csrf-challenge/common/src";
import { GARY_USERNAME } from "@csrf-challenge/common/dist/costants";
import { getRandomGaryMessage, getRandomGaryVisitingUrlPhrase } from "./gary";
import authorized, {
  verifyUser,
  verifyUsernameTaken,
  loginUser,
  logoutUser,
  createUser,
} from "./authorized";
import { removeItem, addFlag } from "./inventory";
import { allowedNodeEnvironmentFlags } from "process";
import dataRef from "./data";
import urlVisit from "./urlVisit";
import { verifyAntiCsrf, createAntiCsrf } from "./antiCsrf";

const urlExpression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
const urlRegexp = new RegExp(urlExpression);

export default function createHttpApi() {
  const app = express();
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors());
  const gameFolder =
    process.env.NODE_ENV === "production"
      ? "../../../../game/build/"
      : "../../game/build/";
  app.use(express.static(path.join(__dirname, gameFolder)));
  const router = express.Router();

  // --- AUTH
  ep(router, "POST /login", async (req, res: any) => {
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

        const encodedToken = createAntiCsrf(username);
        res.status(200).send({
          status: "ok",
          data: { cookie, expires, encodedToken },
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
  ep(router, "POST /signup", async (req, res: any) => {
    try {
      const { password, username } = req.body;
      if (
        verifyUsernameTaken(username) ||
        password.length <= 0 ||
        username.length <= 0
      ) {
        res
          .status(401)
          .send({ status: "error", data: null, error: "Invalid values" });
      } else {
        const user = createUser(username, password);

        const cookie = uuid();
        const expires = moment()
          .add(1, "days")
          .toDate()
          .toUTCString();

        loginUser(user, cookie);

        res.set(
          "Set-Cookie",
          `sessionToken=${cookie}; Expires=${expires}; SameSite=none; path=/; Secure;`
        );

        const encodedToken = createAntiCsrf(username);

        res.status(200).send({
          status: "ok",
          data: { cookie, expires, encodedToken },
          error: null,
        });
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ status: "error", data: null, error: "Error" });
    }
  });

  ep(router, "POST /logout", authorized, async (req: any, res) => {
    try {
      logoutUser(req.user);
      res.status(200).send({ status: "ok", data: {}, error: null });
    } catch (e) {
      res.status(500).send({ status: "error", data: null, error: "Error" });
    }
  });

  // --- CHAT
  ep(router, "POST /chat", authorized, async (req: any, res) => {
    try {
      const userMessage = req.body.text;
      const isUrl = userMessage.startsWith("http://localhost:3001");
      const message = getRandomGaryMessage(isUrl);

      if (isUrl) {
        await urlVisit(userMessage);
      }

      res.status(200).send({ status: "ok", data: message, error: null });
    } catch (e) {
      res.status(500).send({ status: "error", data: null, error: "Error" });
    }
  });

  ep(router, "GET /inventory", authorized, async (req: any, res) => {
    try {
      const inventory = req.user.inventory;

      res.status(200).send({ status: "ok", data: inventory, error: null });
    } catch (e) {
      res.status(500).send({ status: "error", data: null, error: "Error" });
    }
  });

  // --- SEND ITEM
  ep(router, "POST /send", authorized, async (req: any, res) => {
    try {
      const { to, position, encodedToken } = req.body;
      if (verifyAntiCsrf(encodedToken, req.user.username)) {
        // Hack
        if (req.user.username === GARY_USERNAME) {
          addFlag(to);
        } else {
          removeItem(position, req.user);
        }
        res.status(200).send({ status: "ok", data: {}, error: null });
      } else {
        res.status(403).send({
          status: "error",
          data: null,
          error: "Invalid Anti Csrf Token token",
        });
      }
    } catch (e) {
      res.status(500).send({ status: "error", data: null, error: "Error" });
    }
  });

  app.use("/api", router);
  return app;
}
