const mongoose = require("mongoose");

const TodoListsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  todos: {
    type: [Object],
    required: true,
  },
  dateLastEdited: {
    type: Date,
  },
});

const TodoLists = mongoose.model("TodoLists", TodoListsSchema);

module.exports = TodoLists;
