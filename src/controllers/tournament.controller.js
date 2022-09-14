
const TournamentModel = require("../models/tournament.model")

//GET ALL TOURNAMENT
exports.getTournament =(req, res) => {
    console.log("tournament list")
    TournamentModel.getAllTournament((err,tournaments)=>{
        console.log("we are here")
        if(err) res.send(err);
        res.send({success:true,data:tournaments})
    })
}

//CREATE TOURNAMENT

exports.createTournament = (req , res) =>{
    console.log("req data",req.body)
    const tournament = new TournamentModel(req.body)
    if(req.body.constructor === Object && Object.keys(req.body).length===0)
    {
        res.send(400).send({success:false, message:'No data'})
    }
    else{
        TournamentModel.createTournament(tournament,(err,result)=>{
            if(err){
                res.send(err)
                res.json({status:false, message:"Error inserting data"})
            }
            else{
                res.send(result)
            }
        })
    }
    // TournamentModel.createTournament((err, tournament)=>{
    //     if(err) res.send(err)
    //     res.send(tournament)
    // })
}