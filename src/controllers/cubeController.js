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
  const cube = await cubeManager.getOneWithAccessories(id).lean();

  if (!cube) {
    res.redirect("/404");
  }
  const hasAccessories = cube.accessories.length > 0;
  // const cubeAccessories =
  res.render("details", { cube });
});
router.get("/:cubeId/attach-accessory", async (req, res) => {
  const id = req.params.cubeId;
  const cube = await cubeManager.getOne(id).lean();

  const accessories = await accessoryManager.getAll();
  const hasAccessories = accessories.length > 0;
  res.render("accessory/attachAccessory", {
    cube,
    accessories,
    hasAccessories,
  });
});
router.post("/:cubeId/attach-accessory", async (req, res) => {
  // the accessoryId (from the form for attaching accessory) of the attached accessory in the accessory page( the option that is chosen)
  const { accessoryId } = req.body;
  const cubeId = req.params.cubeId;
  await cubeManager.attachAccessory(cubeId, accessoryId);
  res.redirect(`/cubes/${cubeId}/details`);
});
module.exports = router;
