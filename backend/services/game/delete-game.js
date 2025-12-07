import Game from "../../database/models/game.js";

export default async (id) => {
  await Game.findByIdAndDelete(id);
};
