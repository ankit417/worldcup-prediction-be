const dbConn = require('../config/db.config')


const Teams = function(teams){
    this.team_name = teams.team_name;
    this.team_logo = teams.team_logo;
    this.created_at = new Date();
    this.updated_at = new Date();
}

//GET ALL TEAMS
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

//CREATE TEAMS
Teams.createTeams = ( teamReq , result) => {
    dbConn.query("INSERT INTO team SET ?",[teamReq,], (err,res)=>{
        if(err){
            result(null,err)
        }
        else{
            result(null,res)
        }
    })
}

//GET TEAMS BY ID
Teams.getTeamById = (id,result)=>{
    dbConn.query('SELECT * FROM team WHERE id=?',id,(err,res)=>{
        if(err) result(null,err)
        result(null,res)
    })
}

//UPDATE TEAM
Teams.updateTeam = (id , teamReqData , result)=> {
    dbConn.query('UPDATE team SET ? WHERE id=?',[teamReqData,id],(err,res)=>{
        if(err) result(null,err)
        result(null,res)
    })
}

//DELETE TEAM
Teams.deleteTeam = (id,result) => {
    dbConn.query('DELETE FROM team WHERE id=?' , id, (err,res)=>{
        if(err) result(null,err)
        result(null,res)
    })
}
module.exports = Teams;