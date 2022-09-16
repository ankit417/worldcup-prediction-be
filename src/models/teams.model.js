const dbConn = require('../config/db.config')


const Teams = function(teams){
    this.team_name = teams.team_name;
    this.team_logo = teams.team_logo;
    this.created_at = new Date();
    this.updated_at = new Date();
}

Teams.getAllTeams = (result) => {
    console.log("get all teams")
    dbConn.query("SELECT * FROM team" ,(err,res)=>{
        if(err){
            result(null,err)
        }
        else{
            result(null,res)
        }
    })
}

Teams.createTeams = ( teamReq , result) => {
    dbConn.query("INSERT INTO team SET ?",teamReq, (err,res)=>{
        if(err){
            result(null,err)
        }
        else{
            result(null,res)
        }
    })
}

module.exports = Teams;