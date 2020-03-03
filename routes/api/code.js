const router = require("express").Router();
const codeController = require("../../controllers/codeController");

// Matches with "/api/code"
router
  .route("/")
  .get(codeController.getCodes)
  .post(codeController.addCode);

// Matches with "/api/code/:id"

router
  .route("/:code")
  .delete(codeController.removeCode);

module.exports = router;
