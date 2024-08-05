const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenToken(req, res, next) {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return res
      .status(401)
      .json({ message: "No token provided or token is invalid" });
  }
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({ message: "Invalid token", err });
    }
    req.user = user;
    next();
  });
}

module.exports = {
  authenToken,
};
