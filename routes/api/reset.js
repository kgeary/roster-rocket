const router = require("express").Router();
const resetController = require("../../controllers/resetController");

// Matches with "/api/reset"
router
  .route("/")
  .post(resetController.resetPassword);

module.exports = router;
