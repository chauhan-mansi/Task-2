const express = require("express");
const { createProduct } = require("./products.controller");
const { getProductById } = require("./products.controller");
const router = express.Router();

router.post("/", createProduct);
router.get("/", getProductById);

module.exports = router;
