const jwt = require("jsonwebtoken");
const User = require("../models/users");
const AppError = require("../utils/AppError");

const auth = async (req, res, next) => {
  // 1) Check if token exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("You need to be logged in to see this resource", 403)
    );
  }

  // 2) Validate token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to the token does no longer exist.",
          401
        )
      );
      // Grant access
    }
    req.user = currentUser;
    next();
  } catch (e) {
    return next(new AppError("Unvalid token", 403));
  }
};

module.exports = auth;
