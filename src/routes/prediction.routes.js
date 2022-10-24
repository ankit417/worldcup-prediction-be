const express = require("express");
const router = express.Router();
const authenticateToken = require("../utils/authenticateToken");

const predictionController = require("../controllers/prediction.controller");

//GET ALL PREDICTIONS
router.get("/", authenticateToken, predictionController.getPrediction);

// GET ALL PREDICTION OF USER
router.get(
  "/predicted",
  authenticateToken,
  predictionController.getUserPrediction
);

//CREATE PREDICTION
router.post(
  "/predict",
  authenticateToken,
  predictionController.createPrediction
);

module.exports = router;
