const mongoose = require("mongoose");
// create cube schema (the model of the cube data that will be stored in DB)
const cubeSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
  difficultyLevel: Number,
});
// set the model name to Cube and use the cubeSchema
const Cube = mongoose.model("Cube", cubeSchema);
module.exports = Cube;
