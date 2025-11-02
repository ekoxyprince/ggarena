import Game from "../../database/models/game.js";

export default async () => {
  const games = await Game.find();
  return games;
};
