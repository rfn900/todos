const Users = require("../models/users");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const getUsers = async (req, res, next) => {
  const { user } = req;
  res.status(200).json(user);
};

const getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new AppError("Please provide the id of the user", 400));
  const user = await Users.findOne({ _id: id });
  res.status(200).json(user);
});

module.exports = { getUsers, getUserById };
