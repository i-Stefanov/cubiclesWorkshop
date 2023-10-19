const Cube = require("../models/Cube");

exports.getAll = async (search, from, to) => {
  let result = await Cube.find().lean();
  // TODO: Use monggose to filter in the DB
  // search functionality
  if (search) {
    result = result.filter((cube) =>
      cube.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (from) {
    result = result.filter((cube) => cube.difficultyLevel >= Number(from));
  }
  if (to) {
    result = result.filter((cube) => cube.difficultyLevel <= Number(to));
  }
  return result;
};
// the populate method accepts the path to the model from which it should retrieve data and populates each object from the accessories array with all the data for each accessory
exports.getOne = (cubeId) => Cube.findById(cubeId);
exports.getOneWithAccessories = (cubeId) =>
  this.getOne(cubeId).populate("accessories");
exports.create = async (cubeData) => {
  const cube = new Cube(cubeData);
  await cube.save();
};
exports.attachAccessory = async (cubeId, accessoryId) => {
  return Cube.findByIdAndUpdate(cubeId, {
    // this means - push the accessoryId (see attachAccessory) in the accessories array located in the Cube model
    $push: { accessories: accessoryId },
  });
};
