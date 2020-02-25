const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/user"
router
  .route("/")
  .get(usersController.read);
module.exports = router;
