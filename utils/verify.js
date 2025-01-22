const jwt = require("jsonwebtoken");
const token = require("../model/user/user.controller");

const JWT_SECRET = "mansi2823";

function verifyToken(token) {
  try {
    const mansi = jwt.verify(token, JWT_SECRET);
    return mansi;
  } catch (error) {
    return { error: "Invalid or expired token" };
  }
};

module.exports = verifyToken;
