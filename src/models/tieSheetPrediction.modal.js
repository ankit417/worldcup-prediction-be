const dbConn = require("../config/db.config");

const TieSheetPrediction = function (TieSheetPrediction) {
  this.user_id = TieSheetPrediction.user_id;
  this.group_id = TieSheetPrediction.group_id;
  this.predicted_team_id = TieSheetPrediction.predicted_team_id;
};

//GET ALL TIESHEET BY GROUP ID
TieSheetPrediction.getTieSheetPrediction = (id, userId, result) => {
  dbConn.query(
    // "SELECT * FROM tiesheet_prediction WHERE group_id= ?",
    "SELECT tiesheet_prediction.id, tiesheet_prediction.user_id, tiesheet_prediction.group_id, tiesheet_prediction.predicted_team_id , team.team_name , team.team_logo FROM tiesheet_prediction JOIN team ON team.id=tiesheet_prediction.predicted_team_id WHERE tiesheet_prediction.group_id=? AND tiesheet_prediction.user_id=?",
    [id, userId],
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
  userId,
  result
) => {
  // console.log(tieSheetPredictionReq);
  // dbConn.query(
  //   "INSERT INTO tiesheet_prediction SET ?",
  //   tieSheetPredictionReq,
  //   (err, res) => {
  //     if (err) {
  //       return result(null, err);
  //     } else {
  //       return result(null, res);
  //     }
  //   }
  // );
  console.log("predicting user team");
  dbConn.query(
    "SELECT * FROM tiesheet_prediction WHERE user_id=? AND group_id=? AND predicted_team_id=?",
    [
      userId,
      tieSheetPredictionReq.group_id,
      tieSheetPredictionReq.predicted_team_id,
    ],
    (err, res) => {
      if (err) result(null, err);
      else {
        if (res.length > 0) {
          console.log("already exist");
          return result(null, "Already exists");
        } else {
          dbConn.query(
            "INSERT INTO tiesheet_prediction(user_id,group_id,predicted_team_id) VALUES(?,?,?)",
            [
              userId,
              tieSheetPredictionReq.group_id,
              tieSheetPredictionReq.predicted_team_id,
            ],
            (err, res) => {
              console.log("already exist nope");

              if (err) result(null, err);
              result(null, res);
            }
          );
        }
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
