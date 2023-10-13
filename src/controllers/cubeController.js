const router = require("express").Router();
const cubeManager = require("../managers/cubeManager");
// path /cubes/create
router.get("/create", (req, res) => {
  res.render("create");
});
router.post("/create", (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;
  cubeManager.create({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
  });
  console.log(cubeManager.getAll());
  res.redirect("/");
});
module.exports = router;
