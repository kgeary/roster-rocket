const router = require("express").Router();
const authRoutes = require("./auth");
const codeRoutes = require("./code");
const courseRoutes = require("./course");
const studentCourseRoutes = require("./studentCourse");
const studentRoutes = require("./student");
const userRoutes = require("./user");
const isAuthenticated = require("../../config/middleware/isAuthenticated");
const isAdmin = require("../../config/middleware/isAdmin");

router.use("/auth", authRoutes);
router.use("/code", isAdmin, codeRoutes);
router.use("/course", isAuthenticated, courseRoutes);
router.use("/student", isAuthenticated, studentRoutes);
router.use("/studentcourse", isAuthenticated, studentCourseRoutes);
router.use("/user", isAuthenticated, userRoutes);
module.exports = router;
