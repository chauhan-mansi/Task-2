const verifyToken = require("../utils/verify");


function authentication(req, res, next) {
  const header = req.header.authorization;
  const token = header.split(" ")[1];
  const decoded = verifyToken(token);
  req.user = decoded;
}
module.exports = authentication;
