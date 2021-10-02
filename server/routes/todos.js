const express = require("express");
const router = express.Router();
const TodoLists = require("../models/todoLists");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const todoLists = await TodoLists.find();
  res.json(todoLists);
});

router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  const todoList = await TodoLists.findOne({ _id: id });
  res.json(todoList);
});

router.post("/", async function (req, res, next) {
  const { todos, title } = req.body;

  const payload = {
    title,
    todos,
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

module.exports = router;
