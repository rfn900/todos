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
    res.redirect("/");
  }
);

module.exports = router;
