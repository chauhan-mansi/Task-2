const express = require("express");
const { createProduct, getProduct } = require("./products.controller");
const { getProductById } = require("./products.controller");

const router = express.Router();

router.post("/", createProduct);
router.get("/:id", getProductById);
router.get("/", getProduct);

module.exports = router;
