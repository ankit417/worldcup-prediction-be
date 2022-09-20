const TournamentModel = require("../models/tournament.model");

//GET ALL TOURNAMENT
exports.getTournament = (req, res) => {
  console.log("tournament list");
  TournamentModel.getAllTournament((err, tournaments) => {
    console.log("we are here");
    if (err) res.send(err);
    res.send({ success: true, data: tournaments });
  });
};

//CREATE TOURNAMENT

exports.createTournament = (req, res) => {
  console.log("req data", req.body);
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
      res.send(err);
    } else {
      res.json({ success: true, message: "tournament deleted successfully" });
    }
  });
};
