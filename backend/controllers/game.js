import createGame from "../services/game/create-game.js";
import getGame from "../services/game/get-game.js";
import getGames from "../services/game/get-games.js";
import updateGame from "../services/game/update-game.js";
import deleteGame from "../services/game/delete-game.js";
import catchAsync from "../utils/catchAsync.js";

export const create = catchAsync(async (req, res) => {
  await createGame(req.body);
  res.status(200).json({ sucess: true, message: "Game created" });
});
export const getById = catchAsync(async (req, res) => {
  const game = await getGame(req.params.id);
  res
    .status(200)
    .json({ success: true, message: "game retrieved", data: game });
});
export const getAll = catchAsync(async (req, res) => {
  const games = await getGames();
  res
    .status(200)
    .json({ success: true, message: "games retrieved", data: games });
});
export const update = catchAsync(async (req, res) => {
  await updateGame(req.params.id, req.body);
  res.status(200).json({ sucess: true, message: "Game updated" });
});
export const remove = catchAsync(async (req, res) => {
  await deleteGame(req.params.id);
  res.status(200).json({ success: true, message: "Game deleted" });
});
