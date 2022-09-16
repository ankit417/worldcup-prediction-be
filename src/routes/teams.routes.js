const express = require("express")
const router = express.Router();

const path = require('path')
const multer = require('multer');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, './assets/teamsImage')
    },
    filename:(req,file,cb)=>{
        console.log("files",file)
        const name = Date.now() +path.extname(file.originalname)
        cb(null , name)
    }
})

const upload = multer({storage:storage})


const teamsController = require("../controllers/teams.controller")

//GET ALL TEAMS
router.get('/', teamsController.getAllTeams);

//CREATE TEAM
router.post('/',upload.single('team_logo'), teamsController.createTeams);

module.exports = router