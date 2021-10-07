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
    console.log(req.session);
    res.redirect("http://localhost:3000");
  }
);

module.exports = router;
