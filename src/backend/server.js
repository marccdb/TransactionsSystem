import Fastify from "fastify";
import routes from "./controller/TransactionsController.js";
const fastify = Fastify({ logger: true });
const PORT = "3000";
/**
 @type {import('fastify').FastifyInstance}
 */

fastify.register(routes);

fastify.listen({ port: PORT }, () => {
  fastify.log.info(`server is listening on port ${PORT}`);
});
