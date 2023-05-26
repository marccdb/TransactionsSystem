
import {GetAllTransactions, GetTransaction, CreateTransaction} from "../services/TransactionsService.js"

/**
 @param {FastifyInstance} fastify
 @param {Object} options
  */

export default async function routes(fastify, options) {
  fastify.get("/", async (req, reply) => {
    reply.code(200);
    return GetAllTransactions();
  });

  fastify.get("/:id", async (req) => {
    const id = req.params.id;
    reply.code(200);
    return GetTransaction(id);
  });

  fastify.post("/", async (req) => {
    const data = JSON.parse(req.body);
    await CreateTransaction(data);
    reply.code(201);
    return data;
  });
}
