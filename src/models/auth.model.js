const dbConn = require("../config/db.config");

const USER = function (user) {
  this.full_name = user.full_name;
  this.email = user.email;
  this.phone = user.phone;
  this.password = user.password;
  this.role = user.role;
};

//AUTHENTICATE USER
USER.userAuth = (user, result) => {
  const username = user.username;
  const password = user.password;
  console.log("USER MODAL", username, password);
  dbConn.query(
    "SELECT id,full_name,email,role FROM user WHERE email=? AND password=?",
    [username, password],
    (err, res) => {
      if (err) result(null, err);
      result(null, res);
    }
  );
};

USER.userList = (result) => {
  dbConn.query("SELECT id,full_name,email,phone,role FROM user", (err, res) => {
    if (err) result(null, err);
    result(null, res);
  });
};

//CREATE USER
USER.createUser = (userReq, result) => {
  if (userReq.password.length < 8) {
    result(
      "Password length must be greater or equal to 8",
      "Password length must be greater or equal to 8"
    );
  }
  const email = userReq.email;
  dbConn.query("SELECT email from user where email =?", email, (err, res) => {
    console.log(res);
    if (res.length > 0) {
      return result("User already exist", "error");
    } else {
      dbConn.query("INSERT INTO user SET ? ", userReq, (err, res) => {
        if (err) {
          console.log("Error creating user");
          result(null, err);
        } else {
          result(null, res);
        }
      });
    }
  });
  // dbConn.query("INSERT INTO user SET ? ", userReq, (err, res) => {
  //   if (err) {
  //     console.log("Error creating user");
  //     result(null, err);
  //   } else {
  //     result(null, res);
  //   }
  // });
};

//DELETE USER
USER.deleteUser = (id, result) => {
  dbConn.query("DELETE FROM user WHERE id=?", id, (err, res) => {
    if (err) result(null, err);
    else {
      return result(null, res);
    }
  });
};

//CHANGE PASSWORD
USER.changePassword = (id, passwordReq, result) => {
  dbConn.query("SELECT * from USER where id=?", id, (err, res) => {
    if (res.length > 0) {
      if (res[0].password == passwordReq.oldPass) {
        dbConn.query(
          "UPDATE user SET password=? WHERE id=?",
          [passwordReq.newPass, id],
          (err, res) => {
            if (err) result(null, err);
            else {
              result(null, res);
            }
          }
        );
      } else {
        result("Incorrect password", "Incorrect password");
      }
    } else {
      result("User not found", "user not found");
    }
  });
};

USER.getUserInfo = (id, result) => {
  dbConn.query(
    "SELECT id,full_name,email,phone FROM user WHERE id=?",
    id,
    (err, res) => {
      if (err) result(null, err);
      result(null, res);
    }
  );
};

module.exports = USER;
