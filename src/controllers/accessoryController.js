const router = require("express").Router();
const accessoryManager = require("../managers/accessoryManager");
router.get("/create", (req, res) => {
  res.render("accessory/createAccessory");
});
router.post("/create", async (req, res) => {
  const { name, description, imageUrl } = req.body;
  //add accessory to DB
  await accessoryManager.create({ name, description, imageUrl });

  res.redirect("/");
});
module.exports = router;
