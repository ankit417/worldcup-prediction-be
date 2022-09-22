const express = require("express");
const router = express.Router();

const tieSheetController = require("../controllers/tieSheet.controller");

//GET ALL TIESHEET PREDICTION OF A USER
router.get("/:id", tieSheetController.getTieSheetByGroupId);

//CREATE TIESHEET
router.post("/", tieSheetController.createTieSheet);

//DELETE TIESHEET
router.delete("/:id", tieSheetController.deleteTieSheet);

module.exports = router;
