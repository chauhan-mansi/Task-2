const { SIZE } = require("../../constants/products");
const product = require("./products.model");

exports.createProduct = async (req, res) => {
  try {
    const { title, fabric, colour, price, size } = req.body;
    const checkSize = SIZE[size];
    if(!checkSize){
      return res
      .status(400)
      .json({ success: false, message: "Please check size" });
    }
    const existingProduct = await product.findOne({ title });
    if (existingProduct) {
      return res
        .status(400)
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
    res.status(200).json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
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

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const existingProduct = await product.findById(id);
    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product does not exists" });
    }

    res.status(200).json({ success: true, data: existingProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateProduct = async (req, res) => {
  const { title, fabric, colour, price, size, id } = req.body;
  try {
    const existingProduct = await product.findById(id);
    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product does not exists" });
    }
    await product.findByIdAndUpdate(id, { title, fabric, colour, price, size });
    res
      .status(200)
      .json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const existingProduct = await product.findById(id);
    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product does not exists" });
    }
    await product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
