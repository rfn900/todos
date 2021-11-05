const TodoLists = require("../models/todoLists");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const getTodoLists = catchAsync(async (req, res, next) => {
  const todoLists = await TodoLists.find({ userId: req.user._id });
  res.status(200).json(todoLists);
});

const getTodoListById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const todoList = await TodoLists.findOne({ _id: id });
  res.status(200).json(todoList);
});

const createTodoList = catchAsync(async (req, res, next) => {
  const { userId, todos, title, dateLastEdited } = req.body;

  if ((!userId, !todos, !title)) {
    return next(
      new AppError(
        "User credentials, todo list content and title are required",
        401
      )
    );
  }

  const payload = {
    userId,
    title,
    todos,
    dateLastEdited,
  };

  let todoList = new TodoLists(payload);

  await todoList.save();
  res.status(200).json({
    _id: todoList._id,
  });
});

const updateTodoListById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) return next(new AppError("You need to send the list id"), 401);

  const todoList = await TodoLists.findOneAndUpdate({ _id: id }, req.body);

  if (!todoList) return next(new AppError("Todo list not found"), 404);
  res.status(200).json(todoList);
});

const deleteTodoListById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new AppError("You need to send the list id"), 401);

  await TodoLists.findOneAndDelete({ _id: id });

  res.status(200).json({
    _id: id,
  });
});

module.exports = {
  getTodoLists,
  getTodoListById,
  createTodoList,
  updateTodoListById,
  deleteTodoListById,
};
