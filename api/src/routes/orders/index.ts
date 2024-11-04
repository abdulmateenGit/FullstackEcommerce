import { Router } from "express";
import {
  createOrder,
  getOrder,
  listOrders,
  updateOrder,
} from "./ordersController.js";
import { validateData } from "../../db/middlewares/validationMiddleware.js";
import { insertOrderWitheItemsSchema, updateOrderSchema } from "../../db/ordersSchema.js";
import { verifyToken } from "../../db/middlewares/authMiddleware.js";

const router = Router();

router.post(
  "/",
  verifyToken,
  validateData(insertOrderWitheItemsSchema),
  createOrder
);
router.get("/", verifyToken, listOrders);
router.get("/:id", verifyToken, getOrder);
router.put("/:id", verifyToken, validateData(updateOrderSchema), updateOrder);

export default router;
