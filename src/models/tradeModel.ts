import mongoose from "mongoose";
import { ITrade } from "../interfaces/schemaInterfaces.js";

const tradeSchema = new mongoose.Schema<ITrade>({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "senderType",
  },
  senderType: {
    type: String,
    required: true,
    enum: ["spacestation", "planet"],
  },
  senderItem: {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "receiverType",
  },
  receiverType: {
    type: String,
    required: true,
    enum: ["spacestation", "planet"],
  },
  receiverItem: {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Trade = mongoose.model("Trades", tradeSchema);
export default Trade;


