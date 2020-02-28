const router = require("express").Router();
const userRoutes = require("./user");
const resetRoutes = require("./reset");

// User routes
router.use("/user", userRoutes);
router.use("/reset", resetRoutes);

module.exports = router;
