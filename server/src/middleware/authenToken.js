const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenToken(req, res, next) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    const accessToken = req.headers.authorization.slice(7);
    const token = accessToken.split(".")[1];
    console.log(token);
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Token is not valid" });
      }
      req.user = user;
      next();
    });
  } else {
    // Trả về phản hồi nếu không có token
    return res.status(401).json({ message: "You're not authorized" });
  }
}

module.exports = {
  authenToken,
};
