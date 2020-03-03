const router = require("express").Router();
const userRoutes = require("./user");
const courseRoutes = require("./course");
const studentRoutes = require("./student");
const authRoutes = require("./auth");
const studentCourseRoutes = require("./studentCourse");
const isAuthenticated = require("../../config/middleware/isAuthenticated");
const isAdmin = require("../../config/middleware/isAdmin");

router.use("/code", isAdmin, codeRoutes);
router.use("/user", isAuthenticated, userRoutes);
router.use("/course", isAuthenticated, courseRoutes);
router.use("/student", isAuthenticated, studentRoutes);
router.use("/studentcourse", isAuthenticated, studentCourseRoutes);
router.use("/auth", authRoutes);
module.exports = router;
