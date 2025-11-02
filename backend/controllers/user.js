import userDetails from "../services/user/user-details.js";
import userLeaderboards from "../services/user/user-leaderboards.js";
import catchAsync from "../utils/catchAsync.js";
import updateDetails from "../services/user/update-details.js";
import updatePicture from "../services/user/update-picture.js";
import dashboardDetails from "../services/user/dashboard-details.js";

export const getDetails = catchAsync(async (req, res) => {
  const data = await userDetails(req.user._id);
  res.status(200).json({ success: true, message: "details retrieved", data });
});
export const updateUserDetails = catchAsync(async (req, res) => {
  await updateDetails(req.user._id, req.body);
  res.status(200).json({ success: true, message: "updated profile" });
});
export const updateUserPics = catchAsync(async (req, res) => {
  await updatePicture(req.user._id, req.file);
  res.status(200).json({ success: true, message: "updated profile picture" });
});
export const getLeaderBoard = catchAsync(async (req, res) => {
  const data = await userLeaderboards();
  res.status(200).json({ success: true, message: "details retrieved", data });
});

export const getDashboardDetails = catchAsync(async (req, res) => {
  const data = await dashboardDetails();
  res.status(200).json({ success: true, message: "details retrieved", data });
});
