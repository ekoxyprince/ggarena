import { Router } from "express";
import * as controller from "../controllers/product.js";
import { isCommunityAdmin, isUser } from "../middlewares/role.js";
import { uploadImage } from "../middlewares/upload.js";

const router = Router();

router.route("/").get(controller.getAll);
router.route("/:productId").get(controller.get);
router
  .route("/community/:communityId")
  .post(uploadImage.single("image"), isCommunityAdmin, controller.create)
  .get(controller.getByCommunity);
router
  .route("/community/:communityId/product/:productId")
  .get(isCommunityAdmin, controller.update);

export default router;
