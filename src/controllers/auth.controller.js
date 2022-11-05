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

exports.userlist = (req, res) => {
  console.log(req.user);
  if (req.user.role !== "admin") {
    res.json({ success: false, message: "Permission denied" });
  } else {
    // res.json({ success: true, message: "success" });
    UserModal.userList((err, user) => {
      if (err) {
        res.json({ success: false, message: "Error getting user list" });
      } else {
        res.json({ success: true, data: user });
      }
    });
  }
};

exports.createUser = (req, res) => {
  const userReq = new UserModal(req.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ success: false, message: "No data" });
  } else {
    UserModal.createUser(userReq, (err, result) => {
      if (err) {
        // res.send(err);
        res.json({ success: false, message: err });
      } else {
        res.json({ success: true, message: "User created" });
      }
    });
  }
};

exports.deleteUser = (req, res) => {
  UserModal.deleteUser(req.params.id, (err, user) => {
    if (err) res.json({ success: false, message: "Error deleting user" });
    else {
      res.json({ success: true, message: "User deleted" });
    }
  });
};

exports.changePassword = (req, res) => {
  const userId = req?.user?.id;
  console.log("change password userid", userId);
  UserModal.changePassword(userId, req.body, (err, game) => {
    if (err) res.json({ success: false, message: err });
    else {
      res.json({ success: true, message: "Password changed" });
    }
  });
};

exports.userInfo = (req, res) => {
  UserModal.getUserInfo(req.params.id, (err, user) => {
    if (err) res.json({ success: false, message: err });
    else {
      res.json({ success: true, data: user });
    }
  });
};

exports.editUser = (req, res) => {
  const userReq = new UserModal(req.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ success: false, message: "No data" });
  } else {
    UserModal.editUser(req.params.id, userReq, (err, result) => {
      if (err) {
        // res.send(err);
        res.json({ success: false, message: err });
      } else {
        res.json({ success: true, message: "User Updated" });
      }
    });
  }
};
