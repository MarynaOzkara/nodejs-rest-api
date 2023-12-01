const express = require("express");
const {
  getAll,
  getById,
  deleteById,
  update,
  updateStatusContact,
  addContact,
  updateContact,
} = require("../../controller/contacts");
const isValidId = require("../../midlewares/isValidId");
const router = express.Router();

router.get("/", getAll);
router.get("/:contactId", isValidId, getById);
router.post("/", addContact);
router.delete("/:contactId", isValidId, deleteById);
router.put("/:contactId", isValidId, updateContact);
router.patch("/:contactId/favorite", isValidId, updateStatusContact);
module.exports = router;
