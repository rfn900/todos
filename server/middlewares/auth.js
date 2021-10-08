const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.statusCode = 403;
    res.json({
      status: "error",
      message: "You need to be logged in to view this resource",
    });
  }
};

module.exports = auth;
