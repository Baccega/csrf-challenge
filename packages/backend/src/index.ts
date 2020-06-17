require("dotenv").config();

/* eslint-disable-next-line import/first */
import createHttpApi from "./httpApi";

const port = process.env.NODE_PORT ? parseInt(process.env.NODE_PORT, 10) : 3000;

async function main() {
  const httpApi = createHttpApi();
  await new Promise(resolve => {
    httpApi.listen(port, "0.0.0.0", resolve);
  });
  console.log(`Backend listening on ${port}`);
}

main();
