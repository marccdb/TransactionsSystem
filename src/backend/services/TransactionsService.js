import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GetAllTransactions() {
  const allTransactions = await prisma.todo.findMany();
  return { allTransactions };
}

export async function GetTransaction(id) {
  const parsedId = parseInt(id);
  const transaction = await prisma.todo.findUnique({ where: { id: parsedId } });
  return { transaction };
}
export async function CreateTransaction(newTransaction) {
  const createdTransaction = await prisma.todo.create({
    data: { title: newTransaction.title, description: newTransaction.description },
  });
  return createdTransaction;
}
