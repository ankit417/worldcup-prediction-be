const dbConn = require('../config/db.config')

const Tournament = function(tournament){
  this.tournament_name = tournament.tournament_name;
  this.starting_from = tournament.starting_from;
  this.ending_at = tournament.ending_at;
  this.prediction_deadline = tournament.prediction_deadline

}

//GET ALL TOURNAMENT
Tournament.getAllTournament = (result) =>{
    dbConn.query("SELECT * FROM tournament",(err,res)=>{
        if(err){
            console.log("Error while fetching tournaments");
            result(null,err)
        }
        else{
            console.log("tournament fetched successful",res)
            result(null,res);
        }
    })
}


//CREATE TOURNAMENT
Tournament.createTournament = (tournamentReq , result) =>{
    dbConn.query("INSERT INTO tournament SET ? " , tournamentReq ,(err,res)=>{
        if(err) {
        console.log("error while inserting data")
         result(null,err)}
        else{
            console.log("successfully created tournaments")
            result(null,res)
        }
    })
}

module.exports = Tournament