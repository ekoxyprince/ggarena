import Game from "../../database/models/game.js";

export default async (body) => {
  const game = await Game.create(body);
  return game;
};
