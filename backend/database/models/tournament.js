import mongoose from "mongoose";

const Tournament = mongoose.model(
  "Tournament",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      mode: {
        type: String,
        required: true,
      },
      game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
        required: true,
      },
      totalParticipants: {
        type: Number,
        required: true,
        default: 8,
      },
      price: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        required: true,
        default: "NGN",
      },
      overview: {
        type: String,
        required: true,
      },
      rules: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      hostedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Community",
      },
      isActive: {
        type: Boolean,
        default: true,
      },
      status: {
        type: String,
        default: "scheduled",
      },
      participants: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          wins: {
            type: Number,
            default: 0,
            required: true,
          },
          losses: {
            type: Number,
            default: 0,
            required: true,
          },
          points: {
            type: Number,
            default: 0,
            required: true,
          },
          isEliminated: {
            type: Boolean,
            default: false,
            required: true,
          },
        },
      ],
      currentRound: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  )
);

export default Tournament;
