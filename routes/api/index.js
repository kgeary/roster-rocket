const router = require("express").Router();
const userRoutes = require("./user");

// User routes
router.use("/user", userRoutes);

module.exports = router;
