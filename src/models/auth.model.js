const dbConn = require("../config/db.config");

const USER = function (user) {
  this.full_name = user.full_name;
  this.email = user.email;
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

module.exports = USER;
