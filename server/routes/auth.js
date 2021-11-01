const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../auth");

const intercept = (req, res, next) => {
  req.statusCode(200);
  next();
};
router.get(
  "/google",
  intercept,
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/login" }),
  function (req, res) {
    console.log(req.session);
    res.json({ session: req.session });
  }
);

router.get("/logout", function (req, res) {
  req.session.destroy((err) => res.redirect("http://localhost:3000/login"));
});

router.get("/check", function (req, res) {
  res.json({
    isAuthenticated: req.isAuthenticated(),
  });
});
module.exports = router;
