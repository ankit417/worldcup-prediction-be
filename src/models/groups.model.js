const dbConn = require('../config/db.config')

const Groups = function(group){
    this.tournament_id = group.tournament_id;
    this.group_name = group.group_name;
    this.match_point = group.match_point;
    this.is_final = group.is_final;
    this.created_at = group.created_at;
    this.updated_at = group.updated_at;
}