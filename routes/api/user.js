const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const passport = require("../../config/passport");
const isAdmin = require("../../config/middleware/isAdmin");
// const isAuthenticated = require("../../config/middleware/isAuthenticated");

// Matches with "/api/user"
router
  .route("/")
  .get(usersController.getCurrentUser);

// Matches with "/api/user/children"
router
  .route("/children")
  .get(usersController.getCurrentUserWithChildren);

// Matches with "/api/user/children/:id"
router
  .route("/children/:id")
  .get(usersController.getUserByIdWithChildren);


// Matches with "/api/user/all"
router
  .route("/all")
  .get(isAdmin, usersController.readAll);

// Matches with "/api/user/:id"
router
  .route("/:id")
  .get(usersController.readById)
  .delete(isAdmin, usersController.removeById);

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
