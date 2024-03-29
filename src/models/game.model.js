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
// const getAllGameByGroupIdquery = `SELECT * FROM game INNER JOIN team t1 ON game.teamA_id=t1.id INNER JOIN team t2 on game.teamB_id=t2.id GROUP BY game.teamA_id  WHERE game.group_id=?`;
const getAllGameByGroupIdquery = "SELECT * FROM game WHERE group_id=?";
const query = `
SELECT game.id,
game.group_id,
game.teamA_id,
game.teamB_id,
game.match_date,
game.status,
ta.team_name as teama_name, 
ta.team_logo as teama_logo,
tb.team_name as teamb_name,
tb.team_logo as teamb_logo
FROM game
JOIN team ta ON game.teamA_id = ta.id
JOIN team tb ON game.teamB_id = tb.id
WHERE game.group_id = ?;
`;
// const getAllGameByGroupIdquery =
//   "SELECT * FROM game INNER JOIN team ON game.TeamA_id=team.id  game.teamB_id=team.id  WHERE group_id=?";
Game.getAllGameByGroupId = (id, result) => {
  dbConn.query(query, id, (err, res) => {
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
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

//UPDATE GAME
Game.updateGame = (gameId, gameReq, result) => {
  dbConn.query(
    "UPDATE game SET ? WHERE id=?",
    [gameReq, gameId],
    (err, res) => {
      console.log("update game", err, res);
      if (err) result(null, err);
      else {
        result(null, res);
      }
    }
  );
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
