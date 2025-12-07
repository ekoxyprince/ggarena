import { Router } from "express";
import * as controller from "../controllers/admin-api.js";

const router = Router();

// GET /api/admin/dashboard - overall stats + latest users/tournaments
router.get("/dashboard", controller.getDashboardStats);

// GET /api/admin/users - list all non-admin users
router.get("/users", controller.getUsers);

// Communities management
router.get("/communities", controller.getCommunities);
router.get("/communities/:id", controller.getCommunityAdmin);
router.post("/communities", controller.createCommunityAdmin);
router.patch("/communities/:id", controller.updateCommunityAdmin);
router.patch("/communities/:id/status", controller.updateCommunityStatus);
router.delete("/communities/:id", controller.deleteCommunityAdmin);
router.delete(
  "/communities/:id/participants/:userId",
  controller.deleteCommunityParticipantAdmin
);

// Tournaments overview + CRUD
router.get("/tournaments", controller.getTournaments);
router.get("/tournaments/:id", controller.getTournamentAdmin);
router.post("/tournaments", controller.createTournamentAdmin);
router.patch("/tournaments/:id", controller.updateTournamentAdmin);
router.delete("/tournaments/:id", controller.deleteTournamentAdmin);
router.delete(
  "/tournaments/:id/participants/:userId",
  controller.deleteTournamentParticipantAdmin
);

// Orders management
router.get("/orders", controller.getOrders);
router.patch("/orders/:id/status", controller.updateOrderStatus);

// Payments overview
router.get("/payments", controller.getPayments);

// Users management (points + email)
router.patch("/users/:id/points", controller.updateUserPoints);
router.post("/users/:id/email", controller.sendUserEmail);

export default router;
