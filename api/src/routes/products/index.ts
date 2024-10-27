import { Router } from "express";


const router = Router();


router.get("/", (req, res) => {
  res.send("List of products");
});
router.post("/", (req, res) => {
  res.send("New Product Created");
});
router.post("/:id", (req, res) => {
  console.log(req.params);
  res.send("Product by id");
});

export default router;