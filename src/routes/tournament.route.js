const express = require("express");
const router = express.Router();
const authenticateToken = require("../utils/authenticateToken");
const authenticateAdminToken = require("../utils/adminToken");
const tournamentController = require("../controllers/tournament.controller");

//GET ALL TOURNAMENT
router.get("/", authenticateToken, tournamentController.getTournament);

//CREATE TOURNAMENT
router.post("/", authenticateAdminToken, tournamentController.createTournament);

//GET TOURNAMENT BY ID
router.get("/:id", authenticateToken, tournamentController.getTournamentById);

//UPDATE TOURNAMENT BY ID
router.patch(
  "/:id",
  authenticateAdminToken,
  tournamentController.updateTournament
);

//DELETE TOURNAMENT BY ID
router.delete(
  "/:id",
  authenticateAdminToken,
  tournamentController.deleteTournament
);

//SHOW LEADERBOARD OF A TOURNAMENT
router.get(
  "/leaderboardsetting/:id/:value",
  authenticateAdminToken,
  tournamentController.leaderboardSetting
);
module.exports = router;
