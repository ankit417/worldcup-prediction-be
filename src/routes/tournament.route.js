const express = require("express")
const router = express.Router();

const tournamentController = require('../controllers/tournament.controller');

//GET ALL TOURNAMENT
router.get('/' , tournamentController.getTournament)

//CREATE TOURNAMENT
router.post("/" , tournamentController.createTournament);

//GET TOURNAMENT BY ID
router.get("/:id", tournamentController.getTournamentById);

//UPDATE TOURNAMENT BY ID
router.patch("/:id",tournamentController.updateTournament)

//DELETE TOURNAMENT BY ID
router.delete("/:id",tournamentController.deleteTournament)

module.exports = router;