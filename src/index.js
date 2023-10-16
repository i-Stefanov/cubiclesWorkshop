const express = require("express");
const mongoose = require("mongoose");
const app = express();
const handlebarsConfigurator = require("./config/handlebarsConfig");
// import expressConfig function
const expressConfig = require("./config/expressConfig");
const dbConnect = require("./config/dbConfig");
const routes = require("./routes");

const PORT = 3000;
//! start server while waiting for the database to connect (option)
expressConfig(app);
handlebarsConfigurator(app);
dbConnect()
  .then(() => console.log("DB connected successfuly"))
  //handle error
  .catch((err) => console.log("DB error: " + err));
// Routes
app.use(routes);
app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
// ! start server only after DB is connected (option) since dbConnect is async function
// dbConnect()
//   .then(() => {
// call expressConfig with app
//     expressConfig(app);
//     handlebarsConfigurator(app);
// Routes
//     app.use(routes);
//     app.listen(PORT, () => {
//       console.log("Server is running on port: " + PORT);
//     });
//   })
//   .catch((err) => {
//     console.log("DB error: " + err);
//   });
