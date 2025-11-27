import catchAsync from "../utils/catchAsync.js";
import path from "node:path";

export const getSignin = catchAsync(async (req, res) => {
  res.render(path.join("signin"));
});
