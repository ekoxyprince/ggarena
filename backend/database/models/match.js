import mongoose from "mongoose";

const Match = mongoose.model(
  "Match",
  new mongoose.Schema({
    round: {
      type: Number,
      required: true,
    },
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tourament",
      required: true,
    },
    playerA: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    playerB: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    scoreA: {
      type: Number,
      required: true,
      default: 0,
    },
    scoreB: {
      type: Number,
      required: true,
      default: 0,
    },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      default: "scheduled",
    },
  })
);
export default Match;
