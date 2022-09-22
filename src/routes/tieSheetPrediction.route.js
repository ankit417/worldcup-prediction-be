const express = require("express");
const router = express.Router();

const tieSheetPredictionController = require("../controllers/tieSheetPrediction.controller");

//GET ALL TIESHEET PREDICTION OF A USER
router.get("/:id", tieSheetPredictionController.getTieSheetPrediction);

//CREATE TIESHEET
router.post("/", tieSheetPredictionController.createTieSheetPrediction);

//DELETE TIESHEET
router.delete("/:id", tieSheetPredictionController.deleteTieSheetPrediction);

module.exports = router;
