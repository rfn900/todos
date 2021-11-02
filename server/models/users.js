const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  registerDate: {
    type: Date,
    default: new Date(),
  },
});
const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
