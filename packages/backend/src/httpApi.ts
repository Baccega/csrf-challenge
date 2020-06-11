import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import ep from "./safeEndpoints";

export default function createHttpApi(node: Node) {
  const app = express();
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(cors());

  // ep(app, "GET /chainInfo", async (req, res) => {
  //   const lastBlock = await node.getLastBlock();

  //   if (lastBlock) {
  //     res.send({
  //       status: "ok",
  //       data: {
  //         peer: NodeCommunication.getSelfPeer(),
  //         length: node.blocksCount,
  //         transactionCount: node.transactionCount,
  //         lastHash: lastBlock.hash,
  //       },
  //     });
  //   } else {
  //     res.status(404).send({ status: "error", error: "No lastBlock" });
  //   }
  // });

  return app;
}
