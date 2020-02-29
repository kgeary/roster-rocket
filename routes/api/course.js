const router = require("express").Router();
const coursesController = require("../../controllers/coursesController");
const isAdmin = require("../../config/middleware/isAdmin");

// Matches with "/api/course/all"
router
  .route("/all")
  .get(isAdmin, coursesController.readAll);

router
  .route("/:id")
  .get(coursesController.readById);

// Matches with "/api/course/add"
router
  .route("/add")
  .post(isAdmin, coursesController.addCourse);


// Matches with "/api/course/add"
router
  .route("/remove/:id")
  .post(coursesController.removeCourse);

router
  .route("/update/:id")
  .post(coursesController.updateCourse);

module.exports = router;
