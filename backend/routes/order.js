import { Router } from "express";
import * as controller from "../controllers/order.js";

const router = Router();

router.route("/product/:productId").post(controller.create);

export default router;
