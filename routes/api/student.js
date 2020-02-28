const router = require("express").Router();
const studentsController = require("../../controllers/studentsController");

// Matches with "/api/course/all"
router
  .route("/all")
  .get(studentsController.readAll);

module.exports = router;
