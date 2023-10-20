const jwt = require("../lib/jwt");
const { SECRET } = require("../config/config");

exports.auth = async (req, res, next) => {
  // take the token that is created on login (and saved on the client) from the request
  const token = req.cookies["auth"];

  // if token - user is loged in
  if (token) {
    // validate token
    // if the user is valid jwt.verify returns the decoded token ,in this case ,the user
    try {
      const decodedToken = await jwt.verify(token, SECRET); //returns the payload

      req.user = decodedToken;
      //if the user is loged in registered user then set isAuthenticated in the res.locals object to true and set the res.locals.user to be equal to the payload (which is set in the userManager) of the current token which is the info about the user
      res.locals.user = decodedToken;
      res.locals.isAuthenticated = true;
      next();
    } catch (error) {
      console.log(error);
      res.clearCookie("auth");
      res.redirect("/users/login");
    }
  } else {
    next();
  }
};
//isAuth is called guard middleware
exports.isAuth = (req, res, next) => {
  // if not loged in redirect to login page
  // the user is added to the req object in the auth middleware
  if (!req.user) {
    return res.redirect("/users/login");
  }
  next();
};
