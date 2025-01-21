const mongoose = require("mongoose");

const gadgetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["active", "notactive"], required: true },
});
const subCategory = mongoose.model("subCategory", gadgetSchema);
module.exports = subCategory;
