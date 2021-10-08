const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../auth");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/login" }),
  function (req, res) {
    res.redirect("http://localhost:3000");
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
