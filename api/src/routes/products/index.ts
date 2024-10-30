import { Router } from "express";
import {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./productsController";
import { validateData } from "../../db/middlewares/validationMiddleware";
import { createProductSchema, updateProductSchema } from "../../db/productSchema";

const router = Router();

router.get("/", listProducts);
router.post("/", validateData(createProductSchema), createProduct);
router.get("/:id", getProductById);
router.put("/:id", validateData(updateProductSchema), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
