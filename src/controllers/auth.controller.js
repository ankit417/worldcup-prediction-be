require("dotenv").config();
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");

const UserModal = require("../models/auth.model");
//USER LOGIN
exports.userLogin = (req, res) => {
  const user = { username: req.body.username, password: req.body.password };
  UserModal.userAuth(user, (err, userAuth) => {
    if (err)
      res.json({
        success: false,
        message: "Incorrect username password",
      });
    else {
      if (userAuth.length > 0) {
        const user = {
          name: userAuth[0].full_name,
          role: userAuth[0].role,
          id: userAuth[0].id,
        };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "1d",
        });
        user.accessToken = accessToken;
        res.json({ success: true, data: user });
      } else {
        res.json({ success: false, message: "Username or password not match" });
      }
    }
  });
};

exports.user = (req, res) => {
  res.json({ success: true, data: req.user });
  //   res.json(req.user);
};

exports.userlist = (req, res) => {
  if (req.user.role !== "admin") {
    res.json({ success: false, message: "Permission denied" });
  } else {
    // res.json({ success: true, message: "success" });
    UserModal.userList(req, (err, user) => {
      if (err) {
        res.json({ success: false, message: "Error getting user list" });
      } else {
        res.json({
          success: true,
          data: user,
          // totalCount: user.length > 0 ? user[0]?.totalCount ?? 0 : 0,
          page: req.query.page,
          limit: req.query.limit,
        });
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
        SendMailToNewUser(userReq);
      }
    });
  }
};

const SendMailToNewUser = (userReq) => {
  console.log("send mail", userReq);
  const msg = {
    to: userReq.email, // Change to your recipient
    from: "mail@yetifcmelbourne.com", // Change to your verified sender
    subject: "User Account Created at Yeti FC",
    text: `Dear ${userReq.full_name}, your username is ${userReq.email} and password: ${userReq.password} . Please keep it confidential`,
    html: `<p>Dear ${userReq.full_name}, your username is ${userReq.email} and password: ${userReq.password} . <br> Please keep it confidential</p>`,
  };

  sgMail.setApiKey(
    "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"
  );
  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((error) => {
      console.error("Send grid ==>", JSON.stringify(error));
    });
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
  const userId = req?.user.id;
  console.log("Change password", req.user);
  UserModal.changePassword(userId, req.body, (err, result) => {
    if (err) res.json({ success: false, message: err });
    else {
      res.json({ success: true, message: "Password changed" });
    }
  });
};

exports.resetPassword = (req, res) => {
  UserModal.resetPassword(req.params.id, req.body, (err, result) => {
    if (err) res.json({ success: false, message: err });
    else {
      res.json({ success: true, message: "Password updated" });
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

exports.searchUser = (req, res) => {
  // const userReq = new UserModal(req.body);
  UserModal.searchUser(req.body, (err, result) => {
    if (err) {
      res.json({ success: false, message: err });
    } else {
      res.json({ success: true, data: result });
    }
  });
};
