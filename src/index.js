const express = require("express");
const app = express();
const handlebarsConfigurator = require("./config/handlebarsConfig");
const PORT = 3000;
// import expressConfig function
const expressConfig = require("./config/expressConfig");
// call expressConfig with app
expressConfig(app);
handlebarsConfigurator(app);
// Routes
app.get("/", (req, res) => {
  res.render("index");
});
app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
