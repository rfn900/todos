const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.statusCode = 403;
    res.json("You need to be logged in to see this resource");
  }
};

module.exports = auth;
