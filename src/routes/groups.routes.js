const express = require("express");
const router = express.Router();

const groupController = require("../controllers/groups.controller");

//GET ALL GROUPS
router.get("/:id", groupController.getGroupsByTournamentId);

//CREATE GROUPS
router.post("/", groupController.createGroups);

//GET GROUP BY ID
router.get("/group/:id", groupController.getGroupById);
//UPDATE GROUP
router.patch("/group/:id", groupController.updateGroup);
//DELETE GROUP
router.delete("/group/:id", groupController.deleteGroup);
module.exports = router;
