const router = require("express").Router();
const studentCoursesController = require("../../controllers/studentCoursesController");
// const isAdmin = require("../../config/middleware/isAdmin");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

// Matches with "/api/studentcourse/add"
router
  .route("/add")
  .post(isAuthenticated, studentCoursesController.add);

// Matches with "/api/studentcourse/drop/:StudentId/:CourseId"
router
  .route("/drop/:StudentId/:CourseId")
  .delete(isAuthenticated, studentCoursesController.drop);

module.exports = router;
