const express = require("express");
const {
  getAll,
  getById,
  deleteById,
  updateStatusContact,
  addContact,
  updateContact,
} = require("../../controller/contacts");
const isValidId = require("../../midlewares/isValidId");
const authenticate = require("../../midlewares/authenticate");
const router = express.Router();

router.get("/", authenticate, getAll);
router.get("/:contactId", authenticate, isValidId, getById);
router.post("/", authenticate, addContact);
router.delete("/:contactId", authenticate, isValidId, deleteById);
router.put("/:contactId", authenticate, isValidId, updateContact);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  updateStatusContact
);
module.exports = router;
