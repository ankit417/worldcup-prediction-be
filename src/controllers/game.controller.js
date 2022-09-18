const GameModal = require("../models/game.model");

//GET ALL GAME BY GROUP ID
exports.getGameByGroupId = (req, res) => {
  GameModal.getAllGameByGroupId(req.params.id, (err, game) => {
    if (err) res.json({ success: false, message: "Error getting match" });
    res.json({ success: true, data: game });
  });
};

//CREATE GAME BY GROUP ID
exports.createGameByGroupId = (req, res) => {
  const gameReq = new GameModal(req.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "No data" });
  } else {
    GameModal.createGameByGroupId(gameReq, (err, result) => {
      if (err) {
        res.json({ success: false, message: "Error creating Game" });
      } else {
        res.json({ success: true, message: "Game created Successfull" });
      }
    });
  }
};

//DELETE GAME
exports.deleteGame = (req, res) => {
  GameModal.deleteGameById(req.params.id, (err, game) => {
    if (err) res.json({ success: false, message: "Error deleting game" });
    else {
      res.json({ success: true, message: "Game Deleted" });
    }
  });
};
