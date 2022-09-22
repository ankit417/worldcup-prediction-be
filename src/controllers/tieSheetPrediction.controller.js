const TieSheetPredictionModal = require("../models/tieSheetPrediction.modal");

//GET ALL TIESHEET PREDICTION
exports.getTieSheetPredictionByGroupId = (req, res) => {
  TieSheetPredictionModal.getTieSheetPredictionByGroupId(
    req.params.id,
    (err, tiesheet) => {
      if (err) res.json({ success: false, message: "error getting tiesheet" });
      else {
        return res.json({ success: true, data: tiesheet });
      }
    }
  );
};

//CREATE TIESHEET
exports.createTieSheetPrediction = (req, res) => {
  const tieSheetReq = new TieSheetPredictionModal(req.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "No data" });
  } else {
    TieSheetPredictionModal.createTieSheetPrediction(
      tieSheetReq,
      (err, result) => {
        if (err) {
          res.json({ success: false, message: "Error creating Tiesheet" });
        } else {
          res.json({ success: true, message: "Tie sheet Added" });
        }
      }
    );
  }
};

//DELETE TIESHEET
exports.deleteTieSheetPrediction = (req, res) => {
  TieSheetPredictionModal.deleteTieSheetPrediction(
    req.params.id,
    (err, tiesheet) => {
      if (err) res.json({ success: false, message: "Error deleting tiesheet" });
      else {
        res.json({ success: true, message: "TieSheet Deleted" });
      }
    }
  );
};
