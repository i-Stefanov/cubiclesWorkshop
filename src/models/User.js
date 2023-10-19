const { urlencoded } = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  username: String,
  password: {
    type: String,
    // validate: {
    //   validator: function (value) {
    //* the value is the password itself ,the this keyword refers to the curent User thet we create,
    //     return this.repeatPassword === value;
    //   },
    //   message: `Passowrds don'n match!`,
    // },
  },
});
// a virtual is a field that is recorded in the document but not in the DB
userSchema.virtual("repeatPassword").set(function (value) {
  //value is repeatPassword
  if (value !== this.password) {
    throw new mongoose.MongooseError("Passwords don't match!");
  }
});
userSchema.pre("save", async function () {
  // the second paramenter 10 refers to the rounds of salt (cost factor) controls how much time takes to generate the hash and salt that makes brute force less probable
  const hash = await bcrypt.hash(this.password, 10);
  //replace teh password with the hash
  this.password = hash;
});
const User = mongoose.model("User", userSchema);
module.exports = User;
