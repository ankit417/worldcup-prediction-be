require("dotenv").config();
const jwt = require("jsonwebtoken");

function authenticateAdminToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.json({
      success: false,
      message: "token required",
    });
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.json({ success: false, message: "Invalid token" });
      if (user.role !== "admin") {
        return res.json({
          success: false,
          message: "No Permission",
        });
      }
      req.user = user;
      next();
    });
  }
}

module.exports = authenticateAdminToken;
