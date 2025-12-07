import { Router } from "express";
import * as controller from "../controllers/game.js";
import { isAdmin } from "../middlewares/role.js";

const router = Router();

router.route("/").get(controller.getAll).post(isAdmin, controller.create);
router
  .route("/:id")
  .get(controller.getById)
  .patch(isAdmin, controller.update)
  .delete(isAdmin, controller.remove);

export default router;
