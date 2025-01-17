const mongoose = require("mongoose");


const jacketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fabric: { type: String, required: true },
  colour: { type: String, required: false },
  price: { type: Number, required: true },
  size: {
    type: String,
    enum: ["small", "medium", "large"],
    required: true,
  },
});


const product = mongoose.model('Product', jacketSchema);

module.exports= product;