const router = require("express").Router();
const studentsController = require("../../controllers/studentsController");
const isAdmin = require("../../config/middleware/isAdmin");

// Matches with "/api/student/add"
router
  .route("/add")
  .post(studentsController.addStudent);

// Matches with "/api/student/all"
router
  .route("/all")
  .get(isAdmin, studentsController.readAll);

module.exports = router;
