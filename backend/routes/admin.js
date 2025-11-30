import { Router } from "express";
import * as controller from "../controllers/admin.js";
import { adminAuth } from "../middlewares/auth.js";

const router = Router();
router.route("/signin").get(controller.getSignin).post(controller.signinAdmin);
router.route("/dashboard").get(adminAuth, controller.getDashboard);
router.route("/games").get(adminAuth, controller.getGames);
router.route("/platforms").get(adminAuth, controller.getPlatforms);
router
  .route("/create-game")
  .get(adminAuth, controller.createGames)
  .post(adminAuth, controller.createGamePost);
router
  .route("/update-game/:id")
  .get(adminAuth, controller.updateGames)
  .post(adminAuth, controller.updateGamePost);
router
  .route("/create-platform")
  .get(adminAuth, controller.createPlatforms)
  .post(adminAuth, controller.createPlatformPost);
router
  .route("/update-platform/:id")
  .get(adminAuth, controller.updatePlatforms)
  .post(adminAuth, controller.updatePlatformPost);
router.route("/communities").get(adminAuth, controller.getCommunities);
router.route("/update-community").get(adminAuth, controller.updateCommunity);
router.route("/tournaments").get(adminAuth, controller.getTournaments);
router.route("/users").get(adminAuth, controller.getUsers);
router.route("/payments").get(adminAuth, controller.getPayments);
router.route("/orders").get(adminAuth, controller.getOrders);
router.route("/update-order/:id").get(adminAuth, controller.updateOrderNow);
router
  .route("/reset-password")
  .get(adminAuth, controller.getReset)
  .post(adminAuth, controller.updatePassword);
router.route("/logout").get(adminAuth, controller.logoutUser);

export default router;
