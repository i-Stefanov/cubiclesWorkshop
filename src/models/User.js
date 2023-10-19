const { urlencoded } = require("body-parser");
const mongoose = require("mongoose");
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
const User = mongoose.model("User", userSchema);
module.exports = User;
