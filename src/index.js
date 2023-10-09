const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const path = require("path");
const PORT = 3000;
//Express config
//
// Middleware that means use the public dir for all static files as css and images
// path.resolve is a method that shows where is the folder with the files we need __diraname means current directory
app.use(express.static(path.resolve(__dirname, "public")));
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
