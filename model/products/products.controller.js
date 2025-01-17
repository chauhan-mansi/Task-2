const product = require("./products.model");

exports.createProduct = async (req, res) => {
  try {
    const { title, fabric, colour, price, size } = req.body;
    const productData = new jacketSchema({
      title,
      fabric,
      colour,
      price,
      size,
    });
    await productData.save();
    res.status(201).json({ success: true, message: "Product Added" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Internal Server Error"});
  }
};
