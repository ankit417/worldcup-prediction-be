const { off } = require("../config/db.config");
const dbConn = require("../config/db.config");

const TieSheet = function (tieSheet) {
  this.group_id = tieSheet.group_id;
  this.team_id = tieSheet.team_id;
};

//GET ALL TIESHEET BY GROUP ID
TieSheet.getTieSheetByGroupId = (id, result) => {
  dbConn.query("SELECT * FROM tiesheet WHERE group_id= ?", id, (err, res) => {
    if (err) {
      return result(null, err);
    } else {
      result(null, res);
    }
  });
};

//CREATE TIESHEET
TieSheet.createTieSheet = (tieSheetReq, result) => {
  dbConn.query("INSERT INTO tiesheet SET ?", tieSheetReq, (err, res) => {
    if (err) {
      return result(null, err);
    } else {
      return null, res;
    }
  });
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
