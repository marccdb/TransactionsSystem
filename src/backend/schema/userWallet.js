import mongoose from "mongoose";
const { Schema } = mongoose;

export const userWalletSchema = new Schema({
  user_ref: Number,
  wallet_id: Number,
  bucket_id: Number,
  company_code: Number,
  value: Number,
  balance: Number,
  updated_at: Date,
  expires_at: Date,
});
