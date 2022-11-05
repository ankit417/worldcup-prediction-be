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

//GET ALL TIESHEET PREDICTION OF A USER BY USER ID
router.get(
  "/:id/user/:userid",
  authenticateToken,
  tieSheetPredictionController.getTieSheetPredictionByUserId
);

//CREATE TIESHEET
router.post(
  "/",
  authenticateToken,
  tieSheetPredictionController.createTieSheetPrediction
);

//DELETE TIESHEET
router.delete(
  "/:id",
  authenticateToken,
  tieSheetPredictionController.deleteTieSheetPrediction
);

module.exports = router;
