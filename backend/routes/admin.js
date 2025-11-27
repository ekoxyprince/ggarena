import { Router } from "express";
import * as controller from "../controllers/admin.js";
import { adminAuth } from "../middlewares/auth.js";

const router = Router();
router.route("/signin").get(controller.getSignin);

export default router;
