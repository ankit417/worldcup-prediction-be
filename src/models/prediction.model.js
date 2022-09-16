const dbConn = require("../config/db.config");

const Prediction = function (prediction) {
  this.game_id = prediction.game_id;
  this.prediction = prediction.Prediction;
  this.user_id = prediction.user_id;
  this.created_at = new Date();
  this.updated_at = new Date();
};
