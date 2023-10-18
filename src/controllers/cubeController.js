const router = require("express").Router();
const cubeManager = require("../managers/cubeManager");
const accessoryManager = require("../managers/accessoryManager");
// path /cubes/create
router.get("/create", (req, res) => {
  res.render("create");
});
router.post("/create", async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;
  await cubeManager.create({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
  });
  res.redirect("/");
});
router.get("/:cubeId/details", async (req, res) => {
  const id = req.params.cubeId;
  // since the cube that is returned from the db is not an object but a query that is then transformed into a document and handlebars works only with objects we use .lean() to transform the document into an object
  const cube = await cubeManager.getOne(id).lean();
  if (!cube) {
    res.redirect("/404");
  }
  res.render("details", { cube });
});
router.get("/:cubeId/attach-accessory", async (req, res) => {
  const id = req.params.cubeId;
  const cube = await cubeManager.getOne(id).lean();

  const accessories = await accessoryManager.getAll();
  console.log(accessories);
  res.render("accessory/attachAccessory", { cube, accessories });
});
module.exports = router;
