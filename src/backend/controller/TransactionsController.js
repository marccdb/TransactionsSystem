import {
  GetAllTransactions,
  GetTransactionsFromUser,
  CreateTransaction,
  GetCustomerBalance,
  GetOldestValidBucket,
  GetNonExpTransactions,
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
    const returnedTransaction = await GetTransactionsFromUser(id);
    reply.code(200);
    return returnedTransaction;
  });

  fastify.post("/transactions", async (req, reply) => {
    const transactionPayload = req.body;
    await CreateTransaction(transactionPayload);
    reply.code(201);
    return transactionPayload;
  });

  fastify.get("/transactions/balance/:userid", async (req, reply) => {
    const userId = req.params.userid;
    const returnedBalance = await GetCustomerBalance(userId);
    reply.code(200);
    return {
      user_id: userId,
      balance: returnedBalance,
    };
  });

  fastify.get("/oldestValid/:id", async (req, reply) => {
    const id = req.params.id;
    const returnedTransaction = await GetOldestValidBucket(id);
    reply.code(200);
    return returnedTransaction;
  });

  fastify.get("/valid/:id", async (req, reply) => {
    const id = req.params.id;
    const returnedTransaction = await GetNonExpTransactions(id);
    reply.code(200);
    return returnedTransaction;
  });
}
