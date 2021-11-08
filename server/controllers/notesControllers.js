const TodoNotes = require("../models/todoNotes");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const getTodoNotes = catchAsync(async (req, res, next) => {
  const todoNotes = await TodoNotes.find({ userId: req.user._id });
  res.status(200).json(todoNotes);
});

const getTodoNotesById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new AppError("You need to send a valid notes id"), 401);
  const todoNote = await TodoNotes.findOne({ _id: id });
  if (!todoNote) return next(new AppError("Notes not found"), 404);
  res.status.json(todoNote);
});

const createTodoNotes = catchAsync(async (req, res, next) => {
  const { userId, notes, dateLastEdited } = req.body;
  if (!userId || !notes)
    return next(
      new AppError("You need to provide userId and the notes object"),
      401
    );
  const payload = {
    userId,
    notes,
    dateLastEdited,
  };
  const todoNotes = new TodoNotes(payload);

  await todoNotes.save();
  res.status(200).json({
    _id: todoNotes._id,
  });
});

const updateTodoNotesById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new AppError("You need to provide the notes id"), 401);
  const todoNote = await TodoNotes.findOneAndUpdate({ _id: id }, req.body);
  res.status(200).json(todoNote);
});

const deleteTodoNotesById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new AppError("You need to provide the notes id"), 401);
  await TodoNotes.findOneAndDelete({ _id: id });
  res.status(200).json({
    _id: id,
  });
});

module.exports = {
  getTodoNotes,
  getTodoNotesById,
  createTodoNotes,
  updateTodoNotesById,
  deleteTodoNotesById,
};
