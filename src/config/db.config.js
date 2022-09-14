const mysql = require('mysql');

const dbConn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"prediction"
})

dbConn.connect(function(error){
    if(error) throw error;
    console.log('Database connected successfully')
})

module.exports = dbConn;