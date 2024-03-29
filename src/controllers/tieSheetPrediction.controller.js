const TieSheetPredictionModal = require("../models/tieSheetPrediction.modal");

//GET ALL TIESHEET PREDICTION
exports.getTieSheetPrediction = (req, res) => {
  TieSheetPredictionModal.getTieSheetPrediction(
    req.params.id,
    req.user.id,
    (err, tiesheet) => {
      if (err) res.json({ success: false, message: "error getting tiesheet" });
      else {
        return res.json({ success: true, data: tiesheet });
      }
    }
  );
};
//GET ALL TIESHEET PREDICTION
exports.getTieSheetPredictionByUserId = (req, res) => {
  TieSheetPredictionModal.getTieSheetPrediction(
    req.params.id,
    req.params.userid,
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
      req.user.id,
      (err, result) => {
        if (err) {
          res.json({ success: false, message: err });
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
