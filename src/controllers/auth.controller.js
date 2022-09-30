require("dotenv").config();
const jwt = require("jsonwebtoken");

const UserModal = require("../models/auth.model");
//USER LOGIN
exports.userLogin = (req, res) => {
  const user = { username: req.body.username, password: req.body.password };
  UserModal.userAuth(user, (err, userAuth) => {
    if (err)
      res.json({
        success: false,
        message: "error getting message",
      });
    else {
      if (userAuth.length > 0) {
        const user = {
          name: userAuth[0].full_name,
          role: userAuth[0].role,
          id: userAuth[0].id,
        };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        user.accessToken = accessToken;
        res.json({ success: true, data: user });
      } else {
        res.json({ success: false, message: "Username or password not match" });
      }
    }
  });
};

exports.user = (req, res) => {
  console.log("req", req.user);
  res.json({ success: true, data: req.user });
  //   res.json(req.user);
};
