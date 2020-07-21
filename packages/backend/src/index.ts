require("dotenv").config();
const https = require("https");
const fs = require("fs");
const privateKey = fs.readFileSync("sslcert/server.key", "utf8");
const certificate = fs.readFileSync("sslcert/server.crt", "utf8");
const credentials = { key: privateKey, cert: certificate };

/* eslint-disable-next-line import/first */
import createHttpApi from "./httpApi";

const port = process.env.NODE_PORT ? parseInt(process.env.NODE_PORT, 10) : 3000;

async function main() {
  const httpApi = createHttpApi();

  const httpsServer = https.createServer(credentials, httpApi);
  await new Promise(resolve => {
    httpsServer.listen(port, "0.0.0.0", resolve);
  });
  console.log(`Backend listening on ${port}`);
}

main();
