const express = require("express");
const {
  createSubCategory,
  getSubCategory,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
} = require("./subcategory.controller");

const router = express.Router();

router.post("/", createSubCategory);
router.get("/", getSubCategory);
router.get("/:id", getSubCategoryById);
router.put("/", updateSubCategory);
router.delete("/:id", deleteSubCategory);

module.exports = router;
