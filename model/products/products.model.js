const mongoose = require("mongoose");
const { SIZE } = require("../../constants/products");

const jacketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fabric: { type: String, required: true },
  colour: { type: String, required: false },
  price: { type: Number, required: true },
  size: {
    type: String,
    enum: [SIZE.SMALL, SIZE.MEDIUM, SIZE.LARGE],
    required: true,
  },
});

const product = mongoose.model("Product", jacketSchema);

module.exports = product;
