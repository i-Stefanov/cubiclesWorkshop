const { v4: uuidv4 } = require("uuid");
const cubes = [];
exports.getAll = () => cubes.slice();
exports.create = (cubeData) => {
  console.log(uuidv4());
  const newCube = {
    id: uuidv4(),
    ...cubeData,
  };
  cubes.push(newCube);
  return newCube;
};
