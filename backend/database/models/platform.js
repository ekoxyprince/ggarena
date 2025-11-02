import mongoose from "mongoose";

const Platform = mongoose.model(
  "Platform",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);

export default Platform;
