const router = require("express").Router();
const cubeManager = require("../managers/cubeManager");
const accessoryManager = require("../managers/accessoryManager");
// path /cubes/create
router.get("/create", (req, res) => {
  // the user is added to the req object in the authMiddleware
  res.render("cube/create");
});
router.post("/create", async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;
  await cubeManager.create({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
    owner: req.user._id,
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
  res.render("cube/details", { cube });
});
router.get("/:cubeId/attach-accessory", async (req, res) => {
  const id = req.params.cubeId;
  const cube = await cubeManager.getOne(id).lean();
  // get all accessories that don't have the id of any of the attached ones to this cube
  const accessories = await accessoryManager.getNotOwned(cube.accessories);
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
router.get("/:cubeId/delete", async (req, res) => {
  const cube = await cubeManager.getOne(req.params.cubeId).lean();
  res.render("cube/delete", { cube });
});
router.post("/:cubeId/delete", async (req, res) => {
  await cubeManager.delete(req.params.cubeId);
  res.redirect("/");
});
module.exports = router;
