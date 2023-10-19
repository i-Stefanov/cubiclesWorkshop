const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");

function expressConfig(app) {
  //Express config
  //
  // Middleware that means use the public dir for all static files as css and images
  // path.resolve is a method that transforms relative to absolute path to the files __diraname means current directory
  app.use(express.static(path.resolve(__dirname, "../public")));
  // setup body-parser which is built in express (used for extracting data from forms as an object)
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
}
module.exports = expressConfig;
