const express = require("express");
const validateBody = require("../../midlewares/validateBody");
const authenticate = require("../../midlewares/authenticate");
const isValidId = require("../../midlewares/isValidId");
const upload = require("../../midlewares/upload");
const { schemas } = require("../../models/user");
const ctrl = require("../../controller/auth");
const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.userRegisterJoiSchema),
  ctrl.register
);
router.get("/verify/:verificationToken", ctrl.verifyEmail);
router.post(
  "/verify",
  validateBody(schemas.emailVerifyJoiSchema),
  ctrl.resendVerifyEmail
);
router.post("/login", validateBody(schemas.userLoginJoiSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
router.patch(
  "/:contactId/subscription",
  isValidId,
  authenticate,
  validateBody(schemas.updateSubscriptionJoiSchema),
  ctrl.updateSubscription
);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);
module.exports = router;
