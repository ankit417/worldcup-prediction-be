const express = require("express");
const router = express.Router();
const authenticateToken = require("../utils/authenticateToken");
const authenticateAdminToken = require("../utils/adminToken");
const authController = require("../controllers/auth.controller");

//AUTHENTICATE USER
router.post("/login", authController.userLogin);

//USER
router.get("/user", authenticateToken, authController.user);

//USER INFO
router.get("/userinfo/:id", authenticateToken, authController.userInfo);

//GET ALL USERS LIST
router.get("/userlist", authenticateToken, authController.userlist);

//SEARCH USERLIST
router.post("/userlist", authenticateToken, authController.searchUser);

//CREATE USER
router.post("/createuser", authenticateAdminToken, authController.createUser);

//EDIT USER
router.patch("/edituser/:id", authenticateAdminToken, authController.editUser);

//RESET PASSWORD BY ADMIN
router.patch(
  "/resetpassword/:id",
  authenticateAdminToken,
  authController.resetPassword
);

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

//SEARCH USER
// router.post("/search", authController.searchUser);

module.exports = router;
