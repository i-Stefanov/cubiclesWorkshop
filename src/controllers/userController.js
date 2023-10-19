const router = require("express").Router();
const userManager = require("../managers/userManager");
router.get("/register", (req, res) => {
  res.render("user/registerPage");
});
router.post("/register", async (req, res) => {
  const { username, password, repeatPassword } = req.body;
  await userManager.register({ username, password, repeatPassword });
  res.redirect("/users/login");
});
router.get("/login", (req, res) => {
  res.render("user/loginPage");
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const token = await userManager.login(username, password);
  console.log(token);
  // first argument the name of the cookie,second arg the value of the cookie
  res.cookie("token", token, { httpOnly: true });
  res.redirect("/");
});
module.exports = router;
