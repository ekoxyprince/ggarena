import { Router } from "express";
import * as controller from "../controllers/payment.js";

const router = Router();

router.route("/callback").get(controller.create);

export default router;
