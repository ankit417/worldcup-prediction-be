const GroupsModel = require("../models/groups.model");

//GET ALL GROUPS
exports.getGroupsByTournamentId = (req, res) => {
  console.log("we are here");
  GroupsModel.getGroupsByTournamentId(req.params.id, (err, groups) => {
    if (err) res.send(err);
    res.send({ success: true, data: groups });
  });
};

//CREATE GROUPS INSIDE TOURNAMENT
exports.createGroups = (req, res) => {
  console.log("create groups request controller");
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
    if (err) res.send(err);
    res.send(group);
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
  console.log("Delete group controller");
  GroupsModel.deleteGroup(req.params.id, (err, group) => {
    if (err) res.send(err);
    res.json({ success: true, message: "Group deleted successful" });
  });
};
