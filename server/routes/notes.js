const express = require("express");
const {
  getTodoNotes,
  getTodoNotesById,
  createTodoNotes,
  updateTodoNotesById,
  deleteTodoNotesById,
} = require("../controllers/notesControllers");
const router = express.Router();

router.get("/", getTodoNotes);

router.get("/:id", getTodoNotesById);

router.post("/", createTodoNotes);

router.put("/:id", updateTodoNotesById);

router.delete("/:id", deleteTodoNotesById);

module.exports = router;
