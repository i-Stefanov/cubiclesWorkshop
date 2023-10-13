const { v4: uuidv4 } = require("uuid");
const cubes = [
  {
    id: "1c0447fd-9ca6-4696-b906-6fa4910e74e4",
    name: "Some cube",
    description: "Cool cube",
    imageUrl:
      "https://target.scene7.com/is/image/Target/GUEST_74983d16-c9f3-4e62-9051-2a6a9fff5660?wid=488&hei=488&fmt=pjpeg",
    difficultyLevel: 3,
  },
  {
    id: "1c0467fd-9ca6-4696-b906-6fe4910e74e4",
    name: "Mirror cube",
    description: "Cool mirror cube",

    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCJpJGbBzpyLBJbNZlJAYIXctT3BZgPF880A&usqp=CAU",
    difficultyLevel: 4,
  },
];
exports.getAll = (search, from, to) => {
  let result = cubes.slice();
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
exports.getById = (id) => {
  return cubes.find((c) => c.id == id);
};
exports.create = (cubeData) => {
  const newCube = {
    id: uuidv4(),
    ...cubeData,
  };
  cubes.push(newCube);
  return newCube;
};
