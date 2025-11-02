import { isCommunityAdmin, isUser } from "../middlewares/role.js";
import { uploadImage } from "../middlewares/upload.js";
import { Router } from "express";
import * as controller from "../controllers/community.js";

const router = Router();
router
  .route("/")
  .get(controller.getAll)
  .post(uploadImage.array("image"), isUser, controller.create);

router
  .route("/:communityId")
  .get(controller.get)
  .patch(isCommunityAdmin, uploadImage.single("image"), controller.updatePics);

router.route("/:communityId/participant").patch(controller.communityParticpant);
router
  .route("/:communityId/tournament")
  .get(controller.getCommunityTournament)
  .post(
    isCommunityAdmin,
    uploadImage.single("image"),
    controller.createCommunityTournament
  );

export default router;
