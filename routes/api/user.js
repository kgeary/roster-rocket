const router = require("express").Router();
const usersController = require("../../controllers/usersController");
// const isAuthenticated = require("../../config/middleware/isAuthenticated");
const isAdmin = require("../../config/middleware/isAdmin");

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

// Matches with "/api/user/logout"
router
  .route("/logout")
  .post(usersController.logout);

// Matches with "/api/user/change"
router
  .route("/change")
  .post(usersController.changePassword);

// Matches with "/api/user/img"
router
  .route("/img")
  .patch(usersController.updateImage);
module.exports = router;
