const express = require("express");
const {
  createCategory,
  getCategory,
  getCategoryById,
} = require("./category.controller");

const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategory);
router.get("/:id", getCategoryById);
module.exports = router;
