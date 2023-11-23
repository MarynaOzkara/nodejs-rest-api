const express = require("express");
const createError = require("http-errors");
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../../models/contacts");
const Joi = require("joi");
const contactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
    .required(),
});

const router = express.Router();
// всі контакти
router.get("/", async (_, res, next) => {
  try {
    const data = await listContacts();
    res.json(data);
  } catch (err) {
    next(err);
  }
});
// один контакт
router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      throw createError(404, `Contact not found`);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = contactSchema.validate(body);
    if (error) {
      res.status(400).json(error.message);
    }
    const newContact = await addContact(body);
    res.status(201).json(newContact);
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      throw createError(404, `Contact not found`);
    }
    res.json({ message: `contact deleted` });
  } catch (err) {
    next(err);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = contactSchema.validate(body);
    if (error) {
      res.status(400).json(error.message);
    }
    const { contactId } = req.params;
    const updatedContact = await updateContact(contactId, body);
    if (!updatedContact) {
      throw createError(404, `Contact not found`);
    }
    res.json(updatedContact);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
