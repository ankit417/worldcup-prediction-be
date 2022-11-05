const TeamsModal = require("../models/teams.model");

//GET ALL TEAMS
exports.getAllTeams = (req, res) => {
  TeamsModal.getAllTeams((err, teams) => {
    if (err) res.send(err);
    res.send({ success: true, data: teams });
  });
};

//create Teams
exports.createTeams = (req, res) => {
  const team = new TeamsModal(req.body);
  team.team_logo = `teamsImage/${req.file.filename}`;
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "No data" });
  } else {
    TeamsModal.createTeams(team, (err, result) => {
      if (err) {
        res.send(err);
        res.json({ success: false, message: "Error creating Team" });
      } else {
        res.json({ success: true, message: "Team Added" });
      }
    });
  }
};

//GET TEAM BY ID
exports.getTeamById = (req, res) => {
  TeamsModal.getTeamById(req.params.id, (err, team) => {
    if (err) res.send(err);
    res.send(team);
  });
};
//UPDATE TEAM
exports.updateTeam = (req, res) => {
  const team = new TeamsModal(req.body);
  if (req?.file?.filename) {
    team.team_logo = `teamsImage/${req.file.filename}`;
  }
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "No data" });
  } else {
    TeamsModal.updateTeam(req.params.id, team, (err, result) => {
      if (err) {
        res.send(err);
        res.json({ status: false, message: "Error inserting data" });
      } else {
        res.send(result);
      }
    });
  }
};

//DELETE TEAM
exports.deleteTeam = (req, res) => {
  TeamsModal.deleteTeam(req.params.id, (err, team) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ success: true, message: "Team deleted successfully" });
    }
  });
};
