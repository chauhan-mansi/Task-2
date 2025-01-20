const express = require("express");
const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("./products.controller");
const { getProductById } = require("./products.controller");

const router = express.Router();

router.post("/", createProduct);
router.get("/:id", getProductById);
router.get("/", getProduct);
router.put("/", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
