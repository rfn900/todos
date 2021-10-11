const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.statusCode = 403;
    res.statusMessage = "You need to be logged in to see this resource";
    res.redirect("http://localhost:3000/login");
  }
};

module.exports = auth;
