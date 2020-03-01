const router = require("express").Router();
const authController = require("../../controllers/authController");
const passport = require("../../config/passport");

router
  .route("/user")
  .get(authController.getCurrentUser);

// Matches with "/api/auth/reset"
router
  .route("/reset")
  .post(authController.resetPassword);

// Matches with "/api/auth/login"
router
  .route("/login")
  .post(passport.authenticate("local"), authController.login);

// Matches with "/api/auth/signup"
router
  .route("/signup")
  .post(authController.create);

module.exports = router;
