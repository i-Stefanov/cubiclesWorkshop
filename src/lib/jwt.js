const jsonWebToken = require("jsonwebtoken");
const { promisify } = require("util");
// make sign and verify methods of jwt asynchronous
const jwt = {
  sign: promisify(jsonWebToken.sign),
  verify: promisify(jsonWebToken.verify),
};
module.exports = jwt;
