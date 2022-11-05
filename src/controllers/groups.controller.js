const GroupsModel = require("../models/groups.model");

//GET ALL GROUPS
exports.getGroupsByTournamentId = (req, res) => {
  GroupsModel.getGroupsByTournamentId(req.params.id, (err, groups) => {
    if (err) res.send(err);
    res.send({ success: true, data: groups });
  });
};

//CREATE GROUPS INSIDE TOURNAMENT
exports.createGroups = (req, res) => {
  const groupsReq = new GroupsModel(req.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "No data" });
  } else {
    GroupsModel.createGroups(groupsReq, (err, result) => {
      if (err) {
        res.send(err);
        res.json({ success: false, message: "Error creating group" });
      } else {
        res.json({ success: true, message: "Group created" });
      }
    });
  }
};

//GET GROUP BY ID
exports.getGroupById = (req, res) => {
  GroupsModel.getGroupById(req.params.id, (err, group) => {
    if (err) res.json({ success: false, message: "Error getting group info" });
    res.json({ success: true, data: group });
  });
};

//UPDATE GROUP

exports.updateGroup = (req, res) => {
  const group = new GroupsModel(req.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "No data" });
  } else {
    GroupsModel.updateGroup(req.params.id, group, (err, result) => {
      if (err) {
        res.send(err);
        res.json({ success: false, message: "Error updating group" });
      } else {
        res.json({ success: true, message: "Group updated" });
      }
    });
  }
};

// DELETE GROUP
exports.deleteGroup = (req, res) => {
  GroupsModel.deleteGroup(req.params.id, (err, group) => {
    if (err) res.send(err);
    res.json({ success: true, message: "Group deleted successful" });
  });
};
