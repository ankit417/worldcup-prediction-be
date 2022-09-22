const dbConn = require("../config/db.config");

const TieSheetPrediction = function (TieSheetPrediction) {
  this.user_id = TieSheetPrediction.user_id;
  this.group_id = TieSheetPrediction.group_id;
  this.predicted_team_id = TieSheetPrediction.predicted_team_id;
};

//GET ALL TIESHEET BY GROUP ID
TieSheetPrediction.getTieSheetPrediction = (id, result) => {
  dbConn.query(
    "SELECT * FROM tiesheet_prediction WHERE group_id= ?",
    id,
    (err, res) => {
      if (err) {
        return result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

//CREATE TIESHEET
TieSheetPrediction.createTieSheetPrediction = (
  tieSheetPredictionReq,
  result
) => {
  console.log(tieSheetPredictionReq);
  dbConn.query(
    "INSERT INTO tiesheet_prediction SET ?",
    tieSheetPredictionReq,
    (err, res) => {
      if (err) {
        return result(null, err);
      } else {
        return result(null, res);
      }
    }
  );
};

//DELETE TIESHEET
TieSheetPrediction.deleteTieSheetPrediction = (id, result) => {
  dbConn.query("DELETE FROM tiesheet_prediction WHERE id=?", id, (err, res) => {
    if (err) {
      return result(null, err);
    } else {
      return result(null, res);
    }
  });
};

module.exports = TieSheetPrediction;
