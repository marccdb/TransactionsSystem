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
      title: newTransaction.title,
      description: newTransaction.description,
    },
  });
  return createdTransaction;
}
