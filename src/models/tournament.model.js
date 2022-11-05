const dbConn = require("../config/db.config");

const Tournament = function (tournament) {
  this.tournament_name = tournament.tournament_name;
  this.starting_from = tournament.starting_from;
  this.ending_at = tournament.ending_at;
  this.prediction_deadline = tournament.prediction_deadline;
};

//GET ALL TOURNAMENT
Tournament.getAllTournament = (result) => {
  dbConn.query("SELECT * FROM tournament", (err, res) => {
    if (err) {
      console.log("Error while fetching tournaments");
      result(null, err);
    } else {
      console.log("tournament fetched successful", res);
      result(null, res);
    }
  });
};

//CREATE TOURNAMENT
Tournament.createTournament = (tournamentReq, result) => {
  dbConn.query("INSERT INTO tournament SET ? ", tournamentReq, (err, res) => {
    if (err) {
      console.log("error while inserting data");
      result(null, err);
    } else {
      console.log("successfully created tournaments");
      result(null, res);
    }
  });
};

//GET TOURNAMENT BY ID
Tournament.getTournamentById = (id, result) => {
  dbConn.query("SELECT * FROM tournament WHERE id=?", id, (err, res) => {
    if (err) result(null, err);
    result(null, res);
  });
};

//UPDATE TOURNAMENT
Tournament.updateTournament = (id, tournamentReqData, result) => {
  console.log("tournament req data", tournamentReqData);
  dbConn.query(
    "UPDATE tournament SET tournament_name=? , starting_from=?,ending_at=?,prediction_deadline=? WHERE id= ?",
    [
      tournamentReqData.tournament_name,
      tournamentReqData.starting_from,
      tournamentReqData.ending_at,
      tournamentReqData.prediction_deadline,
      id,
    ],
    (err, res) => {
      if (err) result(null, err);
      result(null, res);
    }
  );
};

//DELETE TOURNAMENT
Tournament.deleteTournament = (id, result) => {
  dbConn.query("DELETE FROM tournament WHERE id=?", id, (err, res) => {
    if (err) result(null, err);
    else {
      dbConn.query(
        "DELETE FROM groups WHERE tournament_id=?",
        id,
        (err, res) => {
          result(null, res);
        }
      );
    }
    // result(null, res);
  });
};

Tournament.leaderboardSetting = (id, value, result) => {
  dbConn.query(
    "UPDATE tournament SET show_leaderboard=? WHERE id=?",
    [value, id],
    (err, res) => {
      console.log("update leaderboard", res);
      if (err) result(null, err);
      result(null, res);
    }
  );
};

module.exports = Tournament;
