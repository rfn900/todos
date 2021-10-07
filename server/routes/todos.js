const express = require("express");
const router = express.Router();
const TodoLists = require("../models/todoLists");
const auth = require("../middlewares/auth");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const todoLists = await TodoLists.find();
  res.statusCode = 200;
  res.json(todoLists);
});

router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  const todoList = await TodoLists.findOne({ _id: id });
  res.json(todoList);
});

router.post("/", async function (req, res, next) {
  const { todos, title, dateLastEdited } = req.body;

  const payload = {
    title,
    todos,
    dateLastEdited,
  };
  let todoList = new TodoLists(payload);

  try {
    console.log(todoList);
    await todoList.save();
    res.status(200);
    res.json({
      _id: todoList._id,
    });
  } catch (e) {
    res.statusCode = 500;
    res.statusMessage = "Something went wrong";
  }
});

router.put("/:id", async function (req, res, next) {
  const { id } = req.params;
  try {
    const todoList = await TodoLists.findOneAndUpdate({ _id: id }, req.body);
    res.status(200);
    res.json(todoList);
  } catch (e) {
    res.statusCode = 500;
    res.statusMessage = "Something went wrong";
  }
});

router.delete("/:id", async function (req, res, next) {
  const { id } = req.params;
  try {
    const todoList = await TodoLists.findOneAndDelete({ _id: id });
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
