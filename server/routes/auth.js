const express = require("express");
const router = express.Router();
const guard = require("../middlewares/guard");
const { logMeIn, deleteMe } = require("../controllers/authControllers");

router.post("/google", logMeIn);

router.delete("/deleteMe", guard, deleteMe);

module.exports = router;
