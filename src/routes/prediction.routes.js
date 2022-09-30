const express = require("express");
const router = express.Router();
const authenticateToken = require("../utils/authenticateToken");

const predictionController = require("../controllers/prediction.controller");

//GET ALL PREDICTIONS
router.get("/", authenticateToken, predictionController.getPrediction);

module.exports = router;
