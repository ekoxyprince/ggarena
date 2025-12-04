import { Router } from "express";
import * as controller from "../controllers/admin-api.js";

const router = Router();

// GET /api/admin/dashboard - overall stats + latest users/tournaments
router.get("/dashboard", controller.getDashboardStats);

// GET /api/admin/users - list all non-admin users
router.get("/users", controller.getUsers);

// Communities management
router.get("/communities", controller.getCommunities);
router.patch("/communities/:id/status", controller.updateCommunityStatus);

// Tournaments overview
router.get("/tournaments", controller.getTournaments);

// Orders management
router.get("/orders", controller.getOrders);
router.patch("/orders/:id/status", controller.updateOrderStatus);

// Payments overview
router.get("/payments", controller.getPayments);

export default router;
