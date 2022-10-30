const dbConn = require("../config/db.config");

const Prediction = function (prediction) {
  this.game_id = prediction.game_id;
  this.prediction = prediction.prediction;
  this.user_id = prediction.user_id;
  this.created_at = new Date();
  this.updated_at = new Date();
};

const workingOn = `SELECT prediction.user_id as userId,
user.full_name,
SUM(CASE WHEN prediction.prediction = game.status THEN groups.match_point ELSE 0 END) AS totalPoint
FROM prediction
JOIN game on game.id = prediction.game_id
JOIN groups
JOIN user
WHERE game.group_id = groups.id  AND prediction.user_id = user.id 
GROUP BY prediction.user_id

UNION

SELECT 
user.id as user_id,
user.full_name,
SUM(groups.match_point) as point
FROM tiesheet_prediction
JOIN groups
JOIN tiesheet on tiesheet_prediction.predicted_team_id = tiesheet.team_id AND tiesheet_prediction.group_id = tiesheet.group_id
JOIN user on user.id = tiesheet_prediction.user_id
WHERE tiesheet_prediction.group_id=groups.id GROUP BY tiesheet_prediction.user_id
ORDER BY userId
`;

const finalWorking = `
SELECT userId,full_name,email, SUM(totalPoint) as finalPoint FROM (
  SELECT prediction.user_id as userId,
  user.full_name,
  user.email,
  SUM(CASE WHEN prediction.prediction = game.status THEN groups.match_point ELSE 0 END) AS totalPoint
  FROM prediction
  JOIN game on game.id = prediction.game_id
  JOIN groups
  JOIN user
  WHERE game.group_id = groups.id  AND prediction.user_id = user.id  AND groups.tournament_id=?
  GROUP BY prediction.user_id
  UNION ALL
  SELECT 
  user.id as user_id,
  user.full_name,
      user.email,
  SUM(groups.match_point) as totalPoint
  FROM tiesheet_prediction
  JOIN groups
  JOIN tiesheet on tiesheet_prediction.predicted_team_id = tiesheet.team_id AND tiesheet_prediction.group_id = tiesheet.group_id
  JOIN user on user.id = tiesheet_prediction.user_id
  WHERE tiesheet_prediction.group_id=groups.id GROUP BY tiesheet_prediction.user_id) t1 GROUP BY userId
  
  
  `;

const query = `
SELECT prediction.user_id as userId,
prediction.prediction,
game.*,
user.full_name,
user.email,
SUM(CASE WHEN prediction.prediction = game.status THEN groups.match_point ELSE 0 END) AS totalPoint
FROM prediction
JOIN game on game.id = prediction.game_id
JOIN groups
JOIN user
WHERE game.group_id = groups.id  AND prediction.user_id = user.id
GROUP BY prediction.user_id
`;
Prediction.getAllPredictions = (id, result) => {
  dbConn.query(finalWorking, id, (err, res) => {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// const userPrediction = `SELECT * FROM prediction`
Prediction.getUserPrediction = (userId, result) => {
  console.log("should call this--------");

  dbConn.query(
    "SELECT * FROM prediction where user_id=?",
    userId,
    (err, res) => {
      if (err) result(null, err);
      console.log("res--------------", res);
      result(null, res);
    }
  );
};

//CREATE PREDICTION
Prediction.createPrediction = (userId, predictionReq, result) => {
  // const gameId = predictionReq?.game_id;
  dbConn.query(
    "SELECT * FROM prediction WHERE game_id=? AND user_id=?",
    [predictionReq.game_id, userId],
    (err, res) => {
      // console.log("create prediction", err, res);
      // result(null, err + res);
      // console.log(res.length);
      // if (err) result(null, err);
      // result(null, res);
      if (err) result(null, err);
      else {
        console.log("res", res);
        // var data = res[0];
        // console.log("Data", data.id);
        if (res.length > 0) {
          predictionId = res[0].id;
          //query here
          dbConn.query(
            "UPDATE prediction SET prediction=? WHERE id=?",
            [predictionReq.prediction, predictionId],
            (err, res) => {
              if (err) result(null, err);
              result(null, res);
            }
          );
        } else {
          dbConn.query(
            "INSERT INTO prediction(game_id,user_id,prediction,created_at,updated_at) VALUES (?,?,?,?,?)",
            [
              predictionReq.game_id,
              userId,
              predictionReq.prediction,
              predictionReq.created_at,
              predictionReq.updated_at,
            ],
            (err, res) => {
              if (err) result(null, err);
              result(null, res);
            }
          );
        }
        // if (res.length > 0) {
        //   // dbConn.query("")
        //   console.log("res id", res[0].id);
        // } else {
        // }
      }
    }
  );
};
module.exports = Prediction;
