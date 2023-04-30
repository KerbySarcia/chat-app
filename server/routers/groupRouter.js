const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupControllers");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router
  .route("/")
  .get(groupController.getAllGroups)
  .post(groupController.createGroup)
  .delete(groupController.deleteGroup);

module.exports = router;
