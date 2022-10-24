const dbConn = require("../config/db.config");

const Groups = function (group) {
  this.tournament_id = group.tournament_id;
  this.group_name = group.group_name;
  this.match_point = group.match_point;
  this.is_final = group.is_final;
  this.user_select = group.user_select;
  this.number_of_team = group.number_of_team;
  this.created_at = new Date();
  this.updated_at = new Date();
};

//GET ALL GROUPS BY TOURNAMENT ID
Groups.getGroupsByTournamentId = (id, result) => {
  dbConn.query("SELECT * FROM groups WHERE tournament_id=?", id, (err, res) => {
    if (err) result(null, err);
    result(null, res);
  });
};

//CREATE GROUPS INSIDE TOURNAMENT
Groups.createGroups = (groupsReq, result) => {
  console.log("group request", groupsReq);
  dbConn.query("INSERT INTO groups SET ? ", groupsReq, (err, res) => {
    if (err) {
      console.log("Error creating group");
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

//GET GROUPS BY ID
Groups.getGroupById = (id, result) => {
  dbConn.query("SELECT * FROM groups WHERE id=?", id, (err, res) => {
    if (err) result(null, err);
    result(null, res);
  });
};

//UPDATE GROUP
Groups.updateGroup = (id, groupReqData, result) => {
  console.log("group req data", groupReqData);
  dbConn.query(
    "UPDATE groups SET ? WHERE id=?",
    [groupReqData, id],
    (err, res) => {
      if (err) result(null, err);
      result(null, res);
    }
  );
  //   dbConn.query(
  //     "UPDATE groups SET tournament_id=?,group_name=?,match_point=?,is_final=? WHERE id=?",
  //     [
  //       groupReqData.tournament_id,
  //       groupReqData.group_name,
  //       groupReqData.match_point,
  //       groupReqData.is_final,
  //       id,
  //     ],
  //     (err, res) => {
  //       if (err) result(null, err);
  //       result(null, res);
  //     }
  //   );
};

//DELETE GROUP
Groups.deleteGroup = (id, result) => {
  console.log("Delete group modal", id);
  dbConn.query("DELETE FROM groups WHERE id=?", id, (err, res) => {
    if (err) result(null, err);
    result(null, res);
  });
};
module.exports = Groups;
