const fastify = require("fastify")({ logger: true });

fastify.register(require("fastify-cors"), {});

const apiPrefix = { prefix: "/api" };

fastify.register(require("./routes/auth"), apiPrefix);
fastify.register(require("./routes/chat"), apiPrefix);

const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
