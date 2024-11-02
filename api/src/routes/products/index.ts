import { Router } from "express";
import {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./productsController.js";
import { validateData } from "../../db/middlewares/validationMiddleware.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../../db/productSchema.js";
import { verifySeller, verifyToken } from "../../db/middlewares/authMiddleware.js";

const router = Router();

router.get("/", listProducts);
router.post(
  "/",
  verifyToken,
  verifySeller,
  validateData(createProductSchema),
  createProduct
);
router.get("/:id", getProductById);
router.put(
  "/:id",
  verifyToken,
  verifySeller,
  validateData(updateProductSchema),
  updateProduct
);
router.delete("/:id", verifyToken, verifySeller, deleteProduct);

export default router;
