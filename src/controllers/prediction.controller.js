const PredictionModal = require("../models/prediction.model");

//GET ALL PREDICTION
exports.getPrediction = (req, res) => {
  console.log("req user", req.user);
  PredictionModal.getAllPredictions((err, predictions) => {
    if (err) {
      res.json({ success: false, message: "Error getting predictions" });
    } else {
      res.json({ success: true, data: predictions });
    }
  });
};

//CREATE PREDICTION
exports.createPrediction = (req, res) => {};
