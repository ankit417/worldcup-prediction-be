const express = require("express");
const router = express.Router();
const authenticateToken = require("../utils/authenticateToken");

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/teamsImage");
  },
  filename: (req, file, cb) => {
    const name = Date.now() + path.extname(file.originalname);
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

const teamsController = require("../controllers/teams.controller");

//GET ALL TEAMS
router.get("/", authenticateToken, teamsController.getAllTeams);

//CREATE TEAM
router.post(
  "/",
  authenticateToken,
  upload.single("team_logo"),
  teamsController.createTeams
);

//UPDATE TEAM
router.patch(
  "/:id",
  authenticateToken,
  upload.single("team_logo"),
  teamsController.updateTeam
);

//DELETE TEAM
router.delete("/:id", authenticateToken, teamsController.deleteTeam);
module.exports = router;
