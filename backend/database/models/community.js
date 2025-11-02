import mongoose from "mongoose";

const Community = mongoose.model(
  "Community",
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
      cover: {
        type: String,
        required: true,
      },
      officialEmail: {
        type: String,
        required: true,
      },
      discordChannel: {
        type: String,
        required: true,
      },
      isVerified: {
        type: Boolean,
        required: true,
        default: false,
      },
      participants: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          isAdmin: Boolean,
        },
      ],
      maxUsers: {
        type: Number,
        default: 100,
      },
      description: {
        type: String,
        required: true,
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);

export default Community;
