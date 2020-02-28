const router = require("express").Router();
const studentsController = require("../../controllers/studentsController");

// Matches with "/api/course/all"
router
  .route("/add")
  .post(studentsController.addStudent);

router
  .route("/all")
  .get(studentsController.readAll);

module.exports = router;
