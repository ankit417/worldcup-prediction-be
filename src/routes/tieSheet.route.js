const express = require("express");
const router = express.Router();
const authenticateToken = require("../utils/authenticateToken");

const tieSheetController = require("../controllers/tieSheet.controller");

//GET ALL TIESHEET PREDICTION OF A USER
router.get("/:id", authenticateToken, tieSheetController.getTieSheetByGroupId);

//CREATE TIESHEET
router.post("/", authenticateToken, tieSheetController.createTieSheet);

//DELETE TIESHEET
router.delete("/:id", authenticateToken, tieSheetController.deleteTieSheet);

module.exports = router;
