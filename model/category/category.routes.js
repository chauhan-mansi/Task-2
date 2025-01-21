const express = require("express");
const {
  createCategory,
  getCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("./category.controller");

const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategory);
router.get("/:id", getCategoryById);
router.put("/", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
