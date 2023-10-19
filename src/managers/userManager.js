const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt");
const { SECRET } = require("../config/config");

exports.register = (userData) => User.create(userData);
exports.login = async (username, password) => {
  // check if user exists
  const user = await User.findOne({ username });
  const jwt = require("../lib/jwt");

  if (!user) {
    throw new Error("Cannot find username or password!");
  }
  // validate password

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Cannot find username or password!");
  }
  const payload = {
    _id: user._id,
    username: user.username,
  };
  const token = await jwt.sign(payload, SECRET, { expiresIn: "2d" });
  return token;
};
