const express = require("express")
const router = express.Router();

const groupController = require("../controllers/groups.controller")

//GET ALL GROUPS
router.get("/", groupController.getGroups);

//CREATE GROUPS
router.post("/" , groupController.createGroups);

module.exports = router;
