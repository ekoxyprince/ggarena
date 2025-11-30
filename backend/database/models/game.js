import mongoose from "mongoose";

const Game = mongoose.model(
  "Game",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  })
);

export default Game;
