const TieSheetModal = require("../models/tieSheet.modal");

//GET ALL TIESHEET
exports.getTieSheetByGroupId = (req, res) => {
  TieSheetModal.getTieSheetByGroupId(req.params.id, (err, tiesheet) => {
    if (err) res.json({ success: false, message: "error getting tiesheet" });
    else {
      return res.json({ success: true, data: tiesheet });
    }
  });
};

//CREATE TIESHEET
exports.createTieSheet = (req, res) => {
  const tieSheetReq = new TieSheetModal(req.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "No data" });
  } else {
    TieSheetModal.createTieSheet(tieSheetReq, (err, result) => {
      if (err) {
        res.json({ success: false, message: "Error creating Tiesheet" });
      } else {
        res.json({ success: true, message: "Tie sheet Added" });
      }
    });
  }
};

//DELETE TIESHEET
exports.deleteTieSheet = (req, res) => {
  TieSheetModal.deleteTieSheet(req.params.id, (err, tiesheet) => {
    if (err) res.json({ success: false, message: "Error deleting tiesheet" });
    else {
      res.json({ success: true, message: "TieSheet Deleted" });
    }
  });
};
