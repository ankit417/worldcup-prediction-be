const PredictionModal = require("../models/prediction.model");

//GET ALL PREDICTION of a tournament
exports.getPrediction = (req, res) => {
  // console.log("req user", req.user);
  PredictionModal.getAllPredictions(req.params.id, (err, predictions) => {
    if (err) {
      res.json({ success: false, message: "Error getting predictions" });
    } else {
      res.json({ success: true, data: predictions });
    }
  });
};

//GET ALL PREDICTION OF A USER
exports.getUserPrediction = (req, res) => {
  console.log("get user prediction");
  PredictionModal.getUserPrediction(req.user.id, (err, predictions) => {
    if (err) {
      res.json({ success: false, message: "Error getting predictions" });
    } else {
      console.log("Prediction", predictions);
      res.json({ success: true, data: predictions });
    }
  });
};

//CREATE PREDICTION
exports.createPrediction = (req, res) => {
  const predictionReq = new PredictionModal(req.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "No data" });
  } else {
    PredictionModal.createPrediction(
      req.user.id,
      predictionReq,
      (err, result) => {
        if (err) {
          res.json({ success: false, message: "Error creating prediction" });
        } else {
          res.json({
            success: true,
            message: "Prediction created Successfully",
          });
        }
      }
    );
  }
};
