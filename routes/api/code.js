const router = require("express").Router();
const codeController = require("../../controllers/codeController");

// Matches with "/api/code"
router
  .route("/")
  .get(codeController.getCodes);
  .post(codeController.addCode);

router
  .router("/:code")
  .delete(codeController.removeCode);

export default router;