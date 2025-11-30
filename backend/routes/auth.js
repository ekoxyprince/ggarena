import { Router } from "express";
import * as controller from "../controllers/auth.js";

const router = Router();

router.route("/signin").post(controller.signinUser);
router.route("/signup").post(controller.signupUser);
router.route("/forget-password").post(controller.forgetUserPass);
router.route("/reset-password/:resetToken").post(controller.resetUserPass);

export default router;
