const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const TodoLists = require("../models/todoLists");
const TodoNotes = require("../models/todoNotes");
const guard = require("../middlewares/guard");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createAndSendToken = (user, statusCode, req, res) => {
  const token = generateToken(user._id);
  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

router.post("/google", async (req, res, next) => {
  const { tokenId } = req.body;
  response = await client.verifyIdToken({
    idToken: tokenId,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { email_verified, name, email, picture } = response.payload;

  if (email_verified) {
    try {
      const user = await User.findOne({ email });
      if (user) {
        createAndSendToken(user, 200, req, res);
      } else {
        const newUser = new User({ name, email, imageUrl: picture });
        newUser.save((err, data) => {
          if (err) {
            return res.json({
              error: "Something went wrong when creating new user...",
            });
          }
          createAndSendToken(data, 200, req, res);
        });
      }
    } catch (e) {
      return res.json({
        error: "Something went wrong when finding user...",
      });
    }
  }
});

router.delete("/deleteMe", guard, async (req, res, next) => {
  const userId = req.user._id;
  await User.findOneAndDelete({ _id: userId });
  await TodoLists.deleteMany({ userId: userId });
  await TodoNotes.deleteMany({ userId: userId });

  res.status(203).json({ success: true });
});

module.exports = router;
