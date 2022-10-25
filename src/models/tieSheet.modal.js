const { off } = require("../config/db.config");
const dbConn = require("../config/db.config");

const TieSheet = function (tieSheet) {
  this.group_id = tieSheet.group_id;
  this.team_id = tieSheet.team_id;
};

//GET ALL TIESHEET BY GROUP ID
TieSheet.getTieSheetByGroupId = (id, result) => {
  dbConn.query(
    "SELECT tiesheet.id, tiesheet.group_id as groupId , team.team_name , team.team_logo FROM tiesheet JOIN team ON team.id=tiesheet.team_id WHERE tiesheet.group_id = ?",
    id,
    (err, res) => {
      if (err) {
        return result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

//CREATE TIESHEET
TieSheet.createTieSheet = (tieSheetReq, result) => {
  dbConn.query(
    `SELECT groups.number_of_team, (SELECT COUNT(tiesheet.group_id) FROM tiesheet 
   WHERE tiesheet.group_id = groups.id) AS addedTiesheet
FROM groups where groups.id=?`,
    tieSheetReq.group_id,
    (err, res) => {
      if (err) result(null, err);
      else {
        console.log("create tiesheet", res[0].addedTiesheet);
        if (res[0]?.addedTiesheet >= res[0]?.number_of_team) {
          return result(
            (err = "canot add more team"),
            (result = "Cannot add more team")
          );
        } else {
          dbConn.query(
            "INSERT INTO tiesheet SET ?",
            tieSheetReq,
            (err, res) => {
              if (err) {
                return result(null, err);
              } else {
                return result(null, res);
              }
            }
          );
        }
      }
    }
  );

  // dbConn.query("INSERT INTO tiesheet SET ?", tieSheetReq, (err, res) => {
  //   if (err) {
  //     return result(null, err);
  //   } else {
  //     return result(null, res);
  //   }
  // });
};

//DELETE TIESHEET
TieSheet.deleteTieSheet = (id, result) => {
  dbConn.query("DELETE FROM tiesheet WHERE id=?", id, (err, res) => {
    if (err) {
      return result(null, err);
    } else {
      return result(null, res);
    }
  });
};

module.exports = TieSheet;
