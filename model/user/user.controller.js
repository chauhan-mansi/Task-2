const user = require("./user.model");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
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
      age,
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
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.page, 10) : 10;
    const perPage = limit;
    const currentPage = page;
    const totalData = await user.countDocuments();
    const totalPages = Math.ceil(totalData / perPage);
    const users = await user
      .find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .sort({ age: -1 });
    res.status(200).json({
      success: true,
      data: {
        users,
        pagination: {
          totalData,
          totalPages,
          currentPage,
          perPage,
        },
      },
    });
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
  const { name, email, password, age, id } = req.body;
  try {
    const existingUser = await user.findById(id);
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exists" });
    }
    await user.findByIdAndUpdate(id, { name, email, password, age });
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

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
    if (password !== existingUser.password) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
    const JWT_SECRET = "mansi2823";
    const token = jwt.sign({ email, password }, JWT_SECRET);
    await res.status(200).json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//only sort 48 ms
// sort and pagination 53 ms
//124 ms only pagination
// pagination and then sort 88 ms (-1) 93 ms
