const mongoose = require("mongoose");

const TodoNotesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.ObjectId,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  dateLastEdited: {
    type: Date,
    required: true,
  },
});

const TodoNotes = mongoose.model("TodoNotes", TodoNotesSchema);

module.exports = TodoNotes;
