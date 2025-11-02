import Game from "../../database/models/game.js";

export default async (id) => {
  const game = await Game.findById(id);
  return game;
};
