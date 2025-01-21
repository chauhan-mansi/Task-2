const mongoose = require("mongoose");
const subCategory = require("../subcategory/subcategory.model");

const electricSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["active", "inactive"],
    required: true,
  },
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "subCategory" },
});

const category = mongoose.model("Category", electricSchema);

module.exports = category;
