const dbConn = require("../config/db.config");

const Game = function (game) {
  this.group_id = game.group_id;
  this.teamA_id = game.teamA_id;
  this.teamB_id = game.teamB_id;
  this.match_date = game.match_date;
  this.status = game.status;
  this.created_at = game.created_at;
  this.updated_at = game.updated_at;
};
