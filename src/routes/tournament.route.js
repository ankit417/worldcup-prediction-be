const express = require("express");
const router = express.Router();
const authenticateToken = require("../utils/authenticateToken");

const tournamentController = require("../controllers/tournament.controller");

//GET ALL TOURNAMENT
router.get("/", authenticateToken, tournamentController.getTournament);

//CREATE TOURNAMENT
router.post("/", authenticateToken, tournamentController.createTournament);

//GET TOURNAMENT BY ID
router.get("/:id", authenticateToken, tournamentController.getTournamentById);

//UPDATE TOURNAMENT BY ID
router.patch("/:id", authenticateToken, tournamentController.updateTournament);

//DELETE TOURNAMENT BY ID
router.delete("/:id", authenticateToken, tournamentController.deleteTournament);

module.exports = router;
