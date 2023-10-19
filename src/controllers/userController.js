const router = require("express").Router();
router.get("/register", (req, res) => {
  res.render("user/registerPage");
});
router.get("/login", (req, res) => {
  res.render("user/loginPage");
});
module.exports = router;
