const express = require("express");
const { createProduct } = require("./products.controller");
const { getProduct } = require("./products.controller");
const router = express.Router();

router.post("/", createProduct);
router.get("/", getProduct);

module.exports = router;
