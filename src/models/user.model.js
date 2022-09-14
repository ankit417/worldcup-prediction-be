const dbConn = require('../config/db.config')

const User = function(user){
    this.full_name = user.full_name;
    this.email = user.email;
    this.password = user.password;
}