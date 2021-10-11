const express = require("express");
const router = express.Router();
const TodoNotes = require("../models/todoNotes");

router.get("/", async function (req, res, next) {
  const todoNotes = await TodoNotes.find({ userId: req.user._id });
  res.statusCode = 200;
  res.json(todoNotes);
});

router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  const todoNote = await TodoNotes.findOne({ _id: id });
  res.statusCode = 200;
  res.json(todoNote);
});

router.post("/", async function (req, res, next) {
  const { userId, notes, dateLastEdited } = req.body;
  const payload = {
    userId,
    notes,
    dateLastEdited,
  };
  let todoNotes = new TodoNotes(payload);

  try {
    await todoNotes.save();
    res.statusCode = 200;
    res.json({
      _id: todoNotes._id,
    });
  } catch (e) {
    res.statusCode = 500;
    res.statusMessage = "Something went wrong";
  }
});

router.put("/:id", async function (req, res, next) {
  const { id } = req.params;
  try {
    const todoNote = await TodoNotes.findOneAndUpdate({ _id: id }, req.body);
    res.status(200);
    res.json(todoNote);
  } catch (e) {
    res.statusCode = 500;
    res.statusMessage = "Something went wrong";
  }
});

router.delete("/:id", async function (req, res, next) {
  const { id } = req.params;

  try {
    await TodoNotes.findOneAndDelete({ _id: id });
    res.status(200);
    res.json({
      _id: id,
    });
  } catch (e) {
    res.statusCode = 500;
    res.statusMessage = "Something went wrong";
  }
});

module.exports = router;
