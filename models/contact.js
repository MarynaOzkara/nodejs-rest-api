const { Schema, model } = require("mongoose");
const Joi = require("joi");
const handleMongooseError = require("../helpers/handleMongooseError");
const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
const contactJoiSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phoneRegex).required(),
  favorite: Joi.boolean(),
});
const updateContactJoiSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email(),
  phone: Joi.string().pattern(phoneRegex),
  favorite: Joi.boolean(),
}).xor("name", "email", "phone");
const updateFavoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
      match: phoneRegex,
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
contactSchema.post("save", handleMongooseError);
const Contact = model("contact", contactSchema);
module.exports = {
  Contact,
  contactJoiSchema,
  updateFavoriteJoiSchema,
  updateContactJoiSchema,
};
