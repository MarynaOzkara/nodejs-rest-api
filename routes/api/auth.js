const express = require("express");
const validateBody = require("../../midlewares/validateBody");
const { schemas } = require("../../models/user");
const ctrl = require("../../controller/auth");
const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.userRegisterJoiSchema),
  ctrl.register
);
router.post("/login", validateBody(schemas.userLoginJoiSchema), ctrl.login);
module.exports = router;
