const dbConn = require("../config/db.config");

const TieSheetPrediction = function (TieSheetPrediction) {
  this.user_id = TieSheetPrediction.user_id;
  this.group_id = TieSheetPrediction.group_id;
  this.prediction_team_id = TieSheetPrediction.prediction_team_id;
};

module.exports = TieSheetPrediction;
