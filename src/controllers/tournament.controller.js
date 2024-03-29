const TournamentModel = require("../models/tournament.model");

//GET ALL TOURNAMENT
exports.getTournament = (req, res) => {
  TournamentModel.getAllTournament((err, tournaments) => {
    if (err) res.send(err);
    res.send({ success: true, data: tournaments });
  });
};

//CREATE TOURNAMENT

exports.createTournament = (req, res) => {
  const tournament = new TournamentModel(req.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "No data" });
  } else {
    TournamentModel.createTournament(tournament, (err, result) => {
      if (err) {
        res.send(err);
        res.json({ success: false, message: "Error inserting data" });
      } else {
        res.json({ success: true, message: "Tournament Created" });
      }
    });
  }
};

//GET TOURNAMENT BY ID
exports.getTournamentById = (req, res) => {
  TournamentModel.getTournamentById(req.params.id, (err, tournament) => {
    if (err) res.send(err);
    res.send(tournament);
  });
};

//UPDATE TOURNAMENT
exports.updateTournament = (req, res) => {
  const tournament = new TournamentModel(req.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "No data" });
  } else {
    TournamentModel.updateTournament(
      req.params.id,
      tournament,
      (err, result) => {
        if (err) {
          res.send(err);
          res.json({ success: false, message: "Error inserting data" });
        } else {
          res.json({ success: true, message: "Tournament updated" });
        }
      }
    );
  }
};

//DELETE TOURNAMENT

exports.deleteTournament = (req, res) => {
  TournamentModel.deleteTournament(req.params.id, (err, tournament) => {
    if (err) {
      res.json({ success: false, message: "Error deleting tournament" });
    } else {
      res.json({ success: true, message: "tournament deleted successfully" });
    }
  });
};

//LEADERBOARD SETTING ON/OFF
exports.leaderboardSetting = (req, res) => {
  TournamentModel.leaderboardSetting(
    req.params.id,
    req.params.value,
    (err, result) => {
      if (err) {
        res.json({
          success: false,
          message: "Error changing leaderboard setting",
        });
      } else {
        res.json({ success: true, message: "Leaderboard setting changed" });
      }
    }
  );
};
