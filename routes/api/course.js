const router = require("express").Router();
const coursesController = require("../../controllers/coursesController");

// Matches with "/api/course/all"
router
  .route("/all")
  .get(coursesController.readAll);

module.exports = router;
