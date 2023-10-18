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

exports.getOne = (cubeId) => Cube.findById(cubeId);
exports.create = async (cubeData) => {
  const cube = new Cube(cubeData);
  await cube.save();
};
exports.attachAccessory = async (cubeId, accessoryId) => {
  return Cube.findByIdAndUpdate(cubeId, {
    // this means - push the accessoryId in the accessories array located in the Cube model
    $push: { accessories: accessoryId },
  });
};
