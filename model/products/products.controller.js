const product = require("./products.model");

exports.createProduct = async (req, res) => {
  try {
    const { title, fabric, colour, price, size } = req.body;
    const existingProduct = await product.findOne({ title });
    if (existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product Already Exists" });
    }
    const productData = new product({
      title,
      fabric,
      colour,
      price,
      size,
    });
    await productData.save();
    res.status(201).json({ success: true, message: "Product Added" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getProduct = async (req, res) => {
    try {
      const products = await product.find(); 
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
