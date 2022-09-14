const express = require("express")
const router = express.Router();

const tournamentController = require('../controllers/tournament.controller');

//GET ALL TOURNAMENT
router.get('/' , tournamentController.getTournament)

//CREATE TOURNAMENT
router.post("/" , tournamentController.createTournament)

module.exports = router;