const mysql = require("mysql");

const dbConn = mysql.createConnection({
  host: "localhost",
  user: "ankit",
  password: "YetiWorld123@#",
  database: "prediction",
});

dbConn.connect(function (error) {
  if (error) throw error;
  console.log("Database connected successfully");
});

module.exports = dbConn;
