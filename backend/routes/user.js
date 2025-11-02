import * as controller from "../controllers/user.js";
import { Router } from "express";
import { uploadImage } from "../middlewares/upload.js";

const router = Router();

router
  .route("/details")
  .get(controller.getDetails)
  .patch(controller.updateUserDetails);
router.route("/leaderboards").get(controller.getLeaderBoard);
router
  .route("/picture")
  .patch(uploadImage.single("image"), controller.updateUserPics);
router.route("/dashboard/details").get(controller.getDashboardDetails);

export default router;
