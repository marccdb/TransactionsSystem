import { PrismaClient } from "@prisma/client";
import mongoose, { Model, Schema } from "mongoose";
import { userWalletSchema } from "../schema/userWallet.js";
const prisma = new PrismaClient();

const userWalletModel = mongoose.model("UserWallet", userWalletSchema);
mongoose.connect(process.env.MONGODB_STRING);

export async function GetAllTransactions() {
  const allTransactions = await prisma.transactions.findMany();
  return allTransactions;
}

export async function GetTransactionsFromUser(id) {
  const parsedId = parseInt(id);
  const foundTransaction = await prisma.transactions.findMany({
    where: {
      user_id: parsedId,
    },
  });
  return foundTransaction;
}

export async function GetCustomerBalance(userId) {
  const parsedUserId = parseInt(userId);
  const findUser = await prisma.transactions.findMany({
    where: { user_id: parsedUserId },
  });
  let userBalance = 0;

  findUser.forEach((element) => {
    userBalance += element.value;
  });

  return userBalance;
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

  if (newTransaction.transaction_type === "debit") {
    const validTransaction = GetOldestValidBucket(
      parteInt(newTransaction.user_id),
    );
  }
  const updateWalletBucket = new userWalletModel({
    user_ref: newTransaction.user_id,
    wallet_id: newTransaction.wallet_id,
    bucket_id: 101,
    value: newTransaction.value,
    company_code: newTransaction.company_code,
    expires_at: newTransaction.expires_at,
  });
  await updateWalletBucket.save();
  return createdTransaction;
}

export async function GetOldestValidBucket(id) {
  const parsedId = parseInt(id);
  const validTransactionsArr = await GetNonExpTransactions(parsedId);
  let result = validTransactionsArr.sort(
    (a, b) =>
      new Date(a.expires_at).getTime() - new Date(b.expires_at).getTime(),
  );
  return result[0];
}

export async function GetNonExpTransactions(id) {
  const parsedId = parseInt(id);
  let currentDate = new Date().toJSON();
  console.log(currentDate);
  let validTransactions = await userWalletModel
    .find({
      user_id: parsedId,
      expires_at: { date: { $gte: currentDate } },
    })
    .exec();
  return validTransactions;
}
