const hbs = require("express-handlebars");

function handlebarsConfigurator(app) {
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
}
module.exports = handlebarsConfigurator;
