const express = require("express");
const router = express.Router();
const authenticateToken = require("../utils/authenticateToken");
const authController = require("../controllers/auth.controller");

//AUTHENTICATE USER
router.post("/login", authController.userLogin);

//USER
router.get("/user", authenticateToken, authController.user);

module.exports = router;
