import getPlatform from "../services/platform/get-platform.js";
import getPlatforms from "../services/platform/get-platforms.js";
import createPlatform from "../services/platform/create-platform.js";
import updatePlatform from "../services/platform/update-platform.js";
import deletePlatform from "../services/platform/delete-platform.js";
import catchAsync from "../utils/catchAsync.js";

export const create = catchAsync(async (req, res) => {
  await createPlatform(req.body);
  res.status(200).json({ sucess: true, message: "platform created" });
});
export const getById = catchAsync(async (req, res) => {
  const platform = await getPlatform(req.params.id);
  res
    .status(200)
    .json({ success: true, message: "platform retrieved", data: platform });
});
export const getAll = catchAsync(async (req, res) => {
  const platforms = await getPlatforms();
  res
    .status(200)
    .json({ success: true, message: "platforms retrieved", data: platforms });
});
export const update = catchAsync(async (req, res) => {
  await updatePlatform(req.params.id, req.body);
  res.status(200).json({ sucess: true, message: "platform updated" });
});
export const remove = catchAsync(async (req, res) => {
  await deletePlatform(req.params.id);
  res.status(200).json({ success: true, message: "platform deleted" });
});
