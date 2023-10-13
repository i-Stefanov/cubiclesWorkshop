const { v4: uuidv4 } = require("uuid");
const cubes = [];
exports.getAll = () => cubes.slice();
exports.create = (cubeData) => {
  const newCube = {
    id: uuidv4(),
    ...cubeData,
  };
  cubes.push(newCube);
  return newCube;
};
