import mongoose from "mongoose";

import { IPlanet } from "../interfaces/schemaInterfaces.js";

const planetSchema = new mongoose.Schema<IPlanet>({
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

const Planet = mongoose.model("Planet", planetSchema);
export default Planet;
