const TeamsModal = require("../models/teams.model");


//GET ALL TEAMS
exports.getAllTeams = (req,res)=>{
    console.log("teams controller")
    TeamsModal.getAllTeams((err,teams)=>{
        if(err) res.send(err)
        res.send({success:true , data:teams})
    })
}

//create Teams
exports.createTeams = (req,res)=>{

    const team = new TeamsModal(req.body)
    console.log("teams file" , req.file.filename)
    console.log("teams body",req.body)
    // console.log("uploading file")
    if(req.body.constructor === Object && Object.keys(req.body).length===0)
    {
        res.send(400).send({success:false, message:'No data'})
    }
    else{
        TeamsModal.createTeams(team , (err,result)=>{
            if(err){
                res.send(err)
                res.json({status:false , message:"Error creating Team"})
            }
            else{
                res.send(result)
            }
        })
    }
}