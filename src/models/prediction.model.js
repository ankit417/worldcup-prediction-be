const dbConn = require("../config/db.config");

const Prediction = function (prediction) {
  this.game_id = prediction.game_id;
  this.prediction = prediction.Prediction;
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
  WHERE game.group_id = groups.id  AND prediction.user_id = user.id 
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
Prediction.getAllPredictions = (result) => {
  dbConn.query(query, (err, res) => {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Prediction;
