const express = require("express");
const router = express.Router();

const gameController = require("../controllers/game.controller");

//GET ALL GAME BY ID
router.get("/:id", gameController.getGameByGroupId);

//CREATE GAME
router.post("/", gameController.createGameByGroupId);

//UPDATE GAME
router.patch("/:id", gameController.updateGameByGameId);

//DELETE GAME
router.delete("/:id", gameController.deleteGame);

module.exports = router;
