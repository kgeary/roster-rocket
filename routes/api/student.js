const router = require("express").Router();
const studentsController = require("../../controllers/studentsController");
const isAdmin = require("../../config/middleware/isAdmin");

// Matches with "/api/course/all"
router
  .route("/add")
  .post(studentsController.addStudent);

router
  .route("/all")
  .get(isAdmin, studentsController.readAll);

module.exports = router;
