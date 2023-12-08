const {
  Contact,
  contactJoiSchema,
  updateFavoriteJoiSchema,
  updateContactJoiSchema,
} = require("../models/contact");
const createError = require("http-errors");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const data = await Contact.find(
      { owner },
      "-createdAt -updatedAt"
    ).populate("owner", "email");
    res.json(data);
  } catch (err) {
    next(err);
  }
};
const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId, "-createdAt -updatedAt");

    if (!contact) {
      throw createError(404, `Contact not found`);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const body = req.body;
    const { error } = contactJoiSchema.validate(body);
    if (error) {
      res.status(400).json(error.message);
    }
    const newContact = await Contact.create({ ...body, owner });
    res.status(201).json(newContact);
  } catch (err) {
    next(err);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw createError(404, `Contact not found`);
    }
    res.json({ message: `contact deleted` });
  } catch (err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = updateContactJoiSchema.validate(body);
    if (error) {
      res.status(400).json(error.message);
    }
    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    if (!updatedContact) {
      throw createError(404, `Contact not found`);
    }
    res.json(updatedContact);
  } catch (err) {
    next(err);
  }
};
const updateStatusContact = async (req, res, next) => {
  try {
    const body = req.body;
    if (!body) {
      throw createError(400, `Missing field favorite`);
    }
    const { error } = updateFavoriteJoiSchema.validate(body);
    if (error) {
      res.status(400).json(error.message);
    }
    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    if (!updatedContact) {
      throw createError(404, `Contact not found`);
    }
    res.json(updatedContact);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getAll,
  getById,
  addContact,
  deleteById,
  updateContact,
  updateStatusContact,
};
