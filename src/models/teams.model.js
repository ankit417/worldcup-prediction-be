const dbConn = require('../config/db.config')


const Teams = function(teams){
    this.team_name = teams.team_name;
    this.team_logo = teams.team_logo;
    this.created_at = new Date();
    this.updated_at = new Date();
}