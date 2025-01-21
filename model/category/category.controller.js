const category = require("./category.model");

exports.createCategory = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const existingCategory = await category.findOne({ name });
    if (existingCategory) {
      return res
        .status(400)
        .json({ success: false, message: " Category Already Exists" });
    }
    const categoryData = new category({
      name,
      description,
      status,
    });
    await categoryData.save();
    res.status(200).json({ success: true, message: "Category Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const categories = await category.find();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const existingCategory = await category.findById(id);
    if (!existingCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category does not exists" });
    }
    res.status(200).json({ success: true, data: existingCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateCategory = async (req, res) => {
  const { name, description, status, id } = req.body;
  try {
    const existingCategory = await category.findById(id);
    if (!existingCategory) {
      return res
        .status(400)
        .json({ success: false, message: "Category does not exists" });
    }
    await category.findByIdAndUpdate(id, {
      name,
      description,
      status,
    });
    res
      .status(200)
      .json({ success: true, message: "Category updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const existingCategory = await category.findById(id);
    if (!existingCategory) {
      return res
        .status(400)
        .json({ success: false, message: "Category does not exists" });
    }
    await category.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
