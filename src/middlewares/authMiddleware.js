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
      const user = await jwt.verify(token, SECRET);
      req.user = user;
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
