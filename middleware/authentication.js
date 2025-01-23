const verifyToken = require("../utils/verify");

function authentication(req, res, next) {
  try {
    const header = req.header.authorization;
    const token = header.split(" ")[1];

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized User" });
  }
}
module.exports = authentication;
