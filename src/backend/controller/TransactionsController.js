import {
  GetAllTransactions,
  GetTransaction,
  CreateTransaction,
} from "../services/TransactionsService.js";

/**
 @param {FastifyInstance} fastify
 @param {Object} options
  */

export default async function routes(fastify, options) {
  fastify.get("/transactions", async (req, reply) => {
    reply.code(200);
    return GetAllTransactions();
  });

  fastify.get("/transactions/:id", async (req, reply) => {
    const id = req.params.id;
    const transaction = await GetTransaction(id);
    reply.code(200);
    return transaction;
  });

  fastify.post("/transactions", async (req, reply) => {
    const data = req.body;
    console.log(data);
    await CreateTransaction(data);
    reply.code(201);
    return data;
  });
}
