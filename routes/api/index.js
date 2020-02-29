const router = require("express").Router();
const userRoutes = require("./user");
const courseRoutes = require("./course");
const studentRoutes = require("./student");
const resetRoutes = require("./reset");
const studentCourseRoutes = require("./studentCourse");

// User routes
router.use("/user", userRoutes);
router.use("/course", courseRoutes);
router.use("/student", studentRoutes);
router.use("/reset", resetRoutes);
router.use("/studentcourse", studentCourseRoutes);

module.exports = router;
