const express = require("express");
const router = express.Router();

const predictionController = require("../controllers/prediction.controller");

//GET ALL PREDICTIONS
router.get("/", predictionController.getPrediction);

module.exports = router;
