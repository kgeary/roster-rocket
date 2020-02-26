const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const passport = require("../../config/passport");

// Matches with "/api/user"
router
  .route("/")
  .get(usersController.read);

router
  .route("/login")
  .post(passport.authenticate("local"), usersController.login);

// Matches with "/api/user/signup"
router
  .route("/signup")
  .post(usersController.create);

// Matches with "/api/user/logout"
router
  .route("/logout")
  .post(usersController.logout);

module.exports = router;
