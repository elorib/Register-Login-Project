const joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const schema = new mongoose.Schema({
  fullName: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
  email: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
  phone: {
    type: String,
    minlength: 7,
    maxlength: 15,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 1024,
    required: true,
  },
});

const User = mongoose.model("User", schema, "users");

schema.methods.generateWebToken = function generateWebToken() {
  return jwt.sign(
    {
      id: this.id,
    },
    "youCantCrackMe"
  );
};

function validateUser(user) {
  const schema = joi.object({
    fullName: joi.string().min(2).max(255).required(),
    email: joi
      .string()
      .email()
      .min(3)
      .max(1024)
      .required()
      .regex(/^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/),
    phone: joi.string().min(7).max(15).required(),
    password: joi
      .string()
      .min(8)
      .max(1024)
      .required()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/
      ),
  });
  return schema.validate(user);
}

module.exports = {
  User,
  validateUser,
};
