const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const passport = require("../../config/passport");

// Matches with "/api/user"
router
  .route("/")
  .get(usersController.getCurrentUser);

router
  .route("/children")
  .get(usersController.getCurrentUserWithChildren);


// Matches with "/api/user/all"
router
  .route("/all")
  .get(usersController.readAll);

// Matches with "/api/user/:id"
router
  .route("/:id")
  .get(usersController.readById);

// Matches with "/api/user/login"
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

router
  .route("/change")
  .post(usersController.changePassword);

module.exports = router;
