const user = require("./user.model");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, dateOfBirth } = req.body;
    const existingUser = await user.findOne({ name });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }
    const userData = new user({
      name,
      email,
      password,
      dateOfBirth,
    });
    await userData.save();
    res.status(200).json({ success: true, message: "User account created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const existingUser = await user.findById(id);
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exists" });
    }

    res.status(200).json({ success: true, data: existingUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  const { name, email, password, dateOfBirth, id } = req.body;
  try {
    const existingUser = await user.findById(id);
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exists" });
    }
    await user.findByIdAndUpdate(id, { name, email, password, dateOfBirth });
    res.status(200).json({
      success: true,
      message: "User's information updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const existingUser = await user.findById(id);
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exists" });
    }
    await user.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
