import mongoose from "mongoose";
import { ISpaceStation } from "../interfaces/schemaInterfaces.js";

const stationSchema = new mongoose.Schema<ISpaceStation>({
  name: {
    type: String,
    required: [true, "Please provide a name for the planet"],
    unique: true,
  },
  inventory: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
      name: {
        type: String,
      },
      quantity: {
        type: Number,
      },
    },
  ],
  location: {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    z: {
      type: Number,
      required: true,
    },
  },
});

const Station = mongoose.model("SpaceStation", stationSchema);
export default Station;
