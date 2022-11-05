const express = require("express");
const router = express.Router();
const authenticateToken = require("../utils/authenticateToken");

const predictionController = require("../controllers/prediction.controller");

// //GET ALL PREDICTIONS OF A TOURNAMENT
router.get("/p/:id", authenticateToken, predictionController.getPrediction);

// GET ALL PREDICTION OF USER
router.get(
  "/predicted",
  authenticateToken,
  predictionController.getUserPrediction
);

// GET ALL PREDICTION OF USER
router.get(
  "/predictedbyuser/:id",
  authenticateToken,
  predictionController.getUserPredictionById
);

//CREATE PREDICTION
router.post(
  "/predict",
  authenticateToken,
  predictionController.createPrediction
);

module.exports = router;
