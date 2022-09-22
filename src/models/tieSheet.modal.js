const dbConn = require("../config/db.config");

const TieSheet = function (tieSheet) {
  this.group_id = tieSheet.group_id;
  this.team_id = tieSheet.team_id;
};

module.exports = TieSheet;
