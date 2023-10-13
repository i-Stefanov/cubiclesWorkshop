const express = require("express");
const app = express();
const handlebarsConfigurator = require("./config/handlebarsConfig");
const PORT = 3000;
// import expressConfig function
const expressConfig = require("./config/expressConfig");
// homeController = router from homeController.js file
const homeController = require("./controllers/homeController");
const cubeController = require("./controllers/cubeController");
// call expressConfig with app
expressConfig(app);
handlebarsConfigurator(app);
// Routes
app.use(homeController);
// use cubeController for all requests that start with /cubes
app.use("/cubes", cubeController);
// if route does not exist redirect to 404 page
app.get("*", (req, res) => {
  res.redirect("/404");
});
app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
