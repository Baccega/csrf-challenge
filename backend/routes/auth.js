const moment = require("moment");

const GARY_USERNAME = "gary";
const GARY_PASSWORD = "gary";

function uuidv4() {
  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

async function routes(fastify, options) {
  const loginOpts = {
    schema: {
      body: {
        type: "object",
        properties: {
          username: { type: "string" },
          password: { type: "string" },
        },
      },
    },
  };

  fastify.post("/login", loginOpts, async (request, reply) => {
    try {
      const { username, password } = request.body;

      if (username === GARY_USERNAME && password === GARY_PASSWORD) {
        const cookieExpirationDate = moment().add(1, "days");
        const cookieIDToken = uuidv4();
        console.log("LOGIN: ", username, password, cookieIDToken);

        reply.headers({
          "Set-Cookie": `sessionID=${cookieIDToken}; Expires=${cookieExpirationDate}; SameSite=none; path=/;`,
        });
        reply.send("Auth complete");
      } else {
        reply.send("Auth failed");
      }
    } catch (e) {
      reply.send("Auth failed");
      const err = new Error();
      err.statusCode = 400;
      throw err;
    }
  });
}

module.exports = routes;
