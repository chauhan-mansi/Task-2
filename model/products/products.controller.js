const product = require("./products.model");

exports.createProduct = async (req, res) => {
  try {
    const { title, fabric, colour, price, size } = req.body;
    const existingProduct = await jacketSchema.findOne({ title });
    if (existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product Already Exists" });
    }
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
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const respond = await fetch(`http://localhost:6000/products`);
    const respon = await respond.json();
    console.log(respon);
    res.json(respon);
  } catch (error) {
    res.send(`Internal Server Error`);
  }
};
