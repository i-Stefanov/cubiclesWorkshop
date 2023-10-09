const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const PORT = 3000;
// handlebars configuration
app.engine(
  "hbs",
  //in the object that is passed to the hbs.engine we can set layoutsDir, partialsDir etc.
  hbs.engine({
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
// Set directory for node to look for the views folder ,because it is not in the root directory
app.set("views", "src/views");
// Routes
app.get("/", (req, res) => {
  res.render("index");
});
app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
