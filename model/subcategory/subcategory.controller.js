const subCategory = require("./subcategory.model");

exports.createSubCategory = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const existingSubCategory = await subCategory.findOne({ name });
    if (existingSubCategory) {
      return res
        .status(400)
        .json({ success: false, message: "SubCategory Already Exists" });
    }
    const subCategoryData = new subCategory({
      name,
      description,
      status,
    });
    await subCategoryData.save();
    res.status(200).json({ success: true, message: "SubCategory Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getSubCategory = async (req, res) => {
  try {
    const subCategories = await subCategory.find();
    res.status(200).json({ success: true, data: subCategories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getSubCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const existingSubCategory = await subCategory.findById(id);
    if (!existingSubCategory) {
      return res
        .status(404)
        .json({ success: false, message: "SubCategory does not exists" });
    }
    res.status(200).json({ success: true, data: existingSubCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateSubCategory = async (req, res) => {
  const { name, description, status, id } = req.body;
  try {
    const existingSubCategory = await subCategory.findById(id);
    if (!existingSubCategory) {
      return res
        .status(400)
        .json({ success: false, message: "SubCategory does not exists" });
    }
    await subCategory.findByIdAndUpdate(id, {
      name,
      description,
      status,
    });
    res
      .status(200)
      .json({ success: true, message: "SubCategory updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.deleteSubCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const existingSubCategory = await subCategory.findById(id);
    if (!existingSubCategory) {
      return res
        .status(400)
        .json({ success: false, message: "SubCategory does not exists" });
    }
    await subCategory.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "SubCategory deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
