const router = require("express").Router();

// homeController = router from homeController.js file
const homeController = require("./controllers/homeController");
const cubeController = require("./controllers/cubeController");
const accessoryController = require("./controllers/accessoryController");
const userController = require("./controllers/userController");

router.use(homeController);
// use cubeController for all requests that start with /cubes
router.use("/cubes", cubeController);
router.use("/accessories", accessoryController);
router.use("/users", userController);

// if route does not exist redirect to 404 page
router.get("*", (req, res) => {
  res.redirect("/404");
});

module.exports = router;
