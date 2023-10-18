const router = require("express").Router();
router.get("/create", (req, res) => {
  res.render("accessory/createAccessory");
});
router.post("/create", (req, res) => {
  const body = req.body;
  console.log(body);
  //TODO: add accessory to DB
  res.redirect("/");
});
module.exports = router;
