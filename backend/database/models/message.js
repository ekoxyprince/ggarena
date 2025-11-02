import mongoose from "mongoose";

const Message = mongoose.model(
  "Message",
  new mongoose.Schema(
    {
      sender: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      community: {
        type: mongoose.Schema.ObjectId,
        ref: "Community",
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);

export default Message;
