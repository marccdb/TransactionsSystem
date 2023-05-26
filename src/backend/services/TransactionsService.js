import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GetAllTransactions() {
  const allTransactions = await prisma.transactions.findMany();
  return { allTransactions };
}

export async function GetTransaction(id) {
  const parsedId = parseInt(id);
  const foundTransaction = await prisma.transactions.findUnique({
    where: {
      id: parsedId,
    },
  });
  return foundTransaction;
}
export async function CreateTransaction(newTransaction) {
  const createdTransaction = await prisma.transactions.create({
    data: {
      user_id: newTransaction.user_id,
      wallet_id: newTransaction.wallet_id,
      company_code: newTransaction.company_code,
      value: newTransaction.value,
      origin: newTransaction.origin,
      description: newTransaction.description,
      transaction_type: newTransaction.transaction_type,
      available_at: newTransaction.available_at,
      expires_at: newTransaction.expires_at,
    },
  });
  return createdTransaction;
}
