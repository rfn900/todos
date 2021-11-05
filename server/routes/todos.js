const express = require("express");
const {
  getTodoLists,
  getTodoListById,
  createTodoList,
  updateTodoListById,
  deleteTodoListById,
} = require("../controllers/todosControllers");
const router = express.Router();

/* CRUD operations */
router.get("/", getTodoLists);

router.get("/:id", getTodoListById);

router.post("/", createTodoList);

router.put("/:id", updateTodoListById);

router.delete("/:id", deleteTodoListById);

module.exports = router;
