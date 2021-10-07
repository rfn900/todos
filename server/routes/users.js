const express = require("express");
const router = express.Router();
const Users = require("../models/users");

/* GET users listing. */

router.get("/login", function (req, res, next) {
  res.send('<a href="/auth/google">Sign In with Google</a>');
});

router.get("/", async function (req, res, next) {
  const user = req.user;
  console.log(user);
  res.json(user);
});

router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  const user = await Users.findOne({ _id: id });
  res.statusCode = 200;
  res.json(user);
});
module.exports = router;
