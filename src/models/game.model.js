const dbConn = require("../config/db.config");

const Game = function (game) {
  this.group_id = game.group_id;
  this.teamA_id = game.teamA_id;
  this.teamB_id = game.teamB_id;
  this.match_date = game.match_date;
  this.status = game.status;
  this.created_at = new Date();
  this.updated_at = new Date();
};

//GET ALL GAME BY GROUP ID
Game.getAllGameByGroupId = (id, result) => {
  dbConn.query("SELECT * FROM game WHERE group_id=?", id, (err, res) => {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

//CREATE GAME
Game.createGameByGroupId = (gameReq, result) => {
  dbConn.query("INSERT INTO game SET ?", gameReq, (err, res) => {
    console.log("create game res", res, err);
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

//DELETE GAME
Game.deleteGameById = (id, result) => {
  dbConn.query("DELETE FROM game WHERE id=?", id, (err, res) => {
    if (err) result(null, err);
    else {
      result(null, res);
    }
  });
};

module.exports = Game;
