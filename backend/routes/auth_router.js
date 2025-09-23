const express = require("express");
const { verifyAccessToken } = require("../middlewares/jwtMiddleware"); // Correct import using destructuring
const authController = require("../controllers/auth_controller");
const router = express.Router();

router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.put("/editProfile", verifyAccessToken, authController.editProfile);
router.get("/profile", verifyAccessToken, authController.profile);

module.exports = router;