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

// Matches with "/api/student/user"
router
  .route("/user")
  .get(studentsController.getUserStudents);

// Matches with "/api/student/:id"
router
  .route("/:id")
  .get(studentsController.readById)
  .patch(studentsController.updateStudent)
  .delete(isAdmin, studentsController.removeById);

// Matches with "/api/student/img/:id"
router
  .route("/img/:id")
  .patch(studentsController.updateImage);

module.exports = router;
