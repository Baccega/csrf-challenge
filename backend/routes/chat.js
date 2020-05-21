const urlExpression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
const urlRegexp = new RegExp(urlExpression);

async function routes(fastify, options) {
  const garyOpts = {
    schema: {
      body: {
        type: "object",
        properties: {
          text: { type: "string" },
        },
      },
    },
  };

  fastify.post("/chat/gary", garyOpts, async (request, reply) => {
    try {
      const { text } = request.body;
      if (text.match(urlRegexp)) {
        reply.send("Visiting url");
      } else {
        reply.send("Normal message");
      }
    } catch (e) {
      const err = new Error();
      err.statusCode = 400;
      throw err;
    }
  });
}

module.exports = routes;
