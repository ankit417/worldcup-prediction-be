const bcrypt = require("bcrypt");
const dbConn = require("../config/db.config");
const { user } = require("../controllers/auth.controller");

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
    "SELECT password FROM user WHERE email=?",
    [username],
    async (err, res) => {
      if (err) result(null, err);
      if (res.length > 0) {
        await bcrypt.compare(password, res[0].password, (err, res) => {
          // console.log("bcrypt result", result);
          if (res) {
            dbConn.query(
              "SELECT id,full_name,email,role FROM user WHERE email=?",
              [username],
              (err, res) => {
                if (err) result(null, err);
                result(null, res);
              }
            );
          } else {
            return result(
              "Username password not match",
              "Username password not match"
            );
          }
        });
        // return result;
        // console.log("login res", result);
      } else {
        return result("User not found", "User not found");
      }
      // if (err) result(null, err);
      // result(null, res);
    }
  );
  // dbConn.query(
  //   "SELECT id,full_name,email,role FROM user WHERE email=? AND password=?",
  //   [username, password],
  //   (err, res) => {
  //     if (err) result(null, err);
  //     result(null, res);
  //   }
  // );
};

USER.userList = (req, result) => {
  dbConn.query(
    "SELECT id,full_name,email,phone,role,(SELECT COUNT(*) FROM `user`) AS totalCount FROM user LIMIT ?,?",
    [(req.query.page - 1) * req.query.limit, req.query.limit * 1],
    (err, res) => {
      if (err) result(null, err);
      result(null, res);
    }
  );
  // dbConn.query("SELECT  id,full_name,email,phone,role FROM user", (err, res) => {
  //   if (err) result(null, err);
  //   result(null, res);
  // });
};

//CREATE USER
USER.createUser = async (userReq, result) => {
  if (userReq.password.length < 8) {
    result(
      "Password length must be greater or equal to 8",
      "Password length must be greater or equal to 8"
    );
  }
  const email = userReq.email;
  const salt = await bcrypt.genSalt(10);
  const hashedPW = await bcrypt.hash(userReq.password, salt);
  userReq.password = hashedPW;
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
  dbConn.query("SELECT * from USER where id=?", id, async (err, res) => {
    if (res.length > 0) {
      await bcrypt.compare(
        passwordReq.oldPass,
        res[0].password,
        async (bcryptError, bcryptRes) => {
          if (bcryptRes) {
            const salt = await bcrypt.genSalt(10);
            const hashedPW = await bcrypt.hash(passwordReq.oldPass, salt);

            dbConn.query(
              "UPDATE user SET password=? WHERE id=?",
              [hashedPW, id],
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
        }
      );
      // if (res[0].password == passwordReq.oldPass) {
      //   dbConn.query(
      //     "UPDATE user SET password=? WHERE id=?",
      //     [passwordReq.newPass, id],
      //     (err, res) => {
      //       if (err) result(null, err);
      //       else {
      //         result(null, res);
      //       }
      //     }
      //   );
      // } else {
      //   result("Incorrect password", "Incorrect password");
      // }
    } else {
      result("User not found", "user not found");
    }
  });
};

//ADMIN RESET PASSWORD
USER.resetPassword = async (id, passwordReq, result) => {
  if (passwordReq.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPW = await bcrypt.hash(passwordReq.password, salt);

    dbConn.query(
      "UPDATE user SET password=? WHERE id=?",
      [hashedPW, id],
      (err, res) => {
        if (err) result(null, err);
        else {
          result(null, res);
        }
      }
    );
  } else {
    return result("error updating password", "error updating password");
  }
};

//User info
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

//Edit User
USER.editUser = (id, userReq, result) => {
  dbConn.query(
    "UPDATE user SET full_name=?,email=?,phone=? WHERE id=?",
    [userReq.full_name, userReq.email, userReq.phone, id],
    (err, res) => {
      if (err) result(null, err);
      result(null, res);
    }
  );
};

//Search User
USER.searchUser = (searchReq, result) => {
  console.log("user req", searchReq);
  // result(null, userReq);
  if (searchReq.email && searchReq.phone) {
    dbConn.query(
      "SELECT id,full_name,email,phone,role FROM user WHERE email=? OR phone=?",
      [searchReq.email, searchReq.phone],
      (err, res) => {
        if (err) result(null, err);
        else {
          return result(null, res);
        }
      }
    );
  } else if (searchReq.email) {
    dbConn.query(
      "SELECT id,full_name,email,phone,role FROM user WHERE email=?",
      [searchReq.email],
      (err, res) => {
        if (err) result(null, err);
        else {
          result(null, res);
        }
      }
    );
  } else {
    dbConn.query(
      "SELECT id,full_name,email,phone,role FROM user WHERE phone=?",
      [searchReq.phone],
      (err, res) => {
        if (err) result(null, err);
        else {
          result(null, res);
        }
      }
    );
  }
};

module.exports = USER;
