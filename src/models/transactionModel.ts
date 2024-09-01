import mongoose from "mongoose";
import { ITransaction } from "../interfaces/schemaInterfaces.js";


const transactionSchema = new mongoose.Schema<ITransaction>({
  trade: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Trade",
  },
  currentLocation: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "currentLocationType",
  },
  currentLocationType: {
    type: String,
    required: true,
    enum: ["spacestation", "planet"],
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "destinationType",
  },
  destinationType: {
    type: String,
    required: true,
    enum: ["spacestation", "planet"],
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "in-transit", "completed", "cancelled"],
  },
  estimatedDelivery: {
    type: Date,
    required: true,
  },
});

const Transaction = mongoose.model("Transactions", transactionSchema);
export default Transaction;
