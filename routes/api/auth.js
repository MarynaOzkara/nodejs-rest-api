const express = require("express");
const validateBody = require("../../midlewares/validateBody");
const authenticate = require("../../midlewares/authenticate");
const { schemas } = require("../../models/user");
const ctrl = require("../../controller/auth");
const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.userRegisterJoiSchema),
  ctrl.register
);
router.post("/login", validateBody(schemas.userLoginJoiSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
module.exports = router;
