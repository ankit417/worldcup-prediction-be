const express = require("express");
const router = express.Router();
const authenticateToken = require("../utils/authenticateToken");

const tieSheetPredictionController = require("../controllers/tieSheetPrediction.controller");

//GET ALL TIESHEET PREDICTION OF A USER
router.get(
  "/:id",
  authenticateToken,
  tieSheetPredictionController.getTieSheetPrediction
);

//CREATE TIESHEET
router.post(
  "/",
  authenticateToken,
  tieSheetPredictionController.createTieSheetPrediction
);

//DELETE TIESHEET
router.delete("/:id", tieSheetPredictionController.deleteTieSheetPrediction);

module.exports = router;
