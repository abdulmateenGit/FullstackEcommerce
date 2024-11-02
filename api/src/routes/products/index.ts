import { Router } from "express";
import {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./productsController";
import { validateData } from "../../db/middlewares/validationMiddleware";
import {
  createProductSchema,
  updateProductSchema,
} from "../../db/productSchema";
import { verifySeller, verifyToken } from "../../db/middlewares/authMiddleware";

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
