const express = require("express");
const router = express.Router();
const authenticateToken = require("../utils/authenticateToken");
const authenticateAdminToken = require("../utils/adminToken");
const authController = require("../controllers/auth.controller");

//AUTHENTICATE USER
router.post("/login", authController.userLogin);

//USER
router.get("/user", authenticateToken, authController.user);

//GET ALL USERS LIST
router.get("/userlist", authenticateToken, authController.userlist);

//CREATE USER
router.post("/createuser", authenticateAdminToken, authController.createUser);

//DELETE USER
router.delete(
  "/deleteuser/:id",
  authenticateAdminToken,
  authController.deleteUser
);

router.patch(
  "/changepassword",
  authenticateToken,
  authController.changePassword
);

module.exports = router;
