import Game from "../../database/models/game.js";

export default async (id, body) => {
  const keys = Object.keys(body);
  const game = await Game.findById(id);
  for (let i = 0; i < keys.length; i++) {
    game[keys[i]] = body[keys[i]];
  }
  const updatedGame = await game.save();
  return updatedGame;
};
