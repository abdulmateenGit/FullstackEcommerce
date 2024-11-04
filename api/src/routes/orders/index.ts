import { Router } from "express";
import { createOrder } from "./ordersController.js";
import { validateData } from "../../db/middlewares/validationMiddleware.js";
import { insertOrderWitheItemsSchema } from "../../db/ordersSchema.js";
import { verifyToken } from "../../db/middlewares/authMiddleware.js";

const router = Router();

router.post("/", verifyToken, validateData(insertOrderWitheItemsSchema), createOrder);

export default router;
