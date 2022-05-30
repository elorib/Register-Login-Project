const express = require("express");
const { validateUser, User } = require("../models/usersModel");
const bcrypt = require("bcrypt");
const lodash = require("lodash");
const router = express.Router();

router.post("/details", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(404).send(error.message);
  }
  let user = await User.findOne({
    email: req.body.email,
  });
  if (user) {
    return res.status(409).send("Email is already registered");
  }
  user = await User.findOne({ phone: req.body.phone });
  if (user) {
    return res.status(409).send("Phone number is already being used");
  }
  user = await new User(req.body);

  const salt = await bcrypt.genSalt(13);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  return res.send(lodash.pick(user, ["name", "email"]));
});

module.exports = router;
