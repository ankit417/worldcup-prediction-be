const express = require("express");
const router = express.Router();
const authenticateToken = require("../utils/authenticateToken");

const gameController = require("../controllers/game.controller");

//GET ALL GAME BY ID
router.get("/:id", authenticateToken, gameController.getGameByGroupId);

//CREATE GAME
router.post("/", authenticateToken, gameController.createGameByGroupId);

//UPDATE GAME
router.patch("/:id", authenticateToken, gameController.updateGameByGameId);

//DELETE GAME
router.delete("/:id", authenticateToken, gameController.deleteGame);

module.exports = router;
