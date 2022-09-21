const dbConn = require("../config/db.config");

const Prediction = function (prediction) {
  this.game_id = prediction.game_id;
  this.prediction = prediction.Prediction;
  this.user_id = prediction.user_id;
  this.created_at = new Date();
  this.updated_at = new Date();
};

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
