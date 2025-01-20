const mongoose = require("mongoose");

const electricSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["active", "inactive"],
    required: true,
  },
});

const category = mongoose.model("Category", electricSchema);

module.exports = category;
