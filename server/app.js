const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const todosRouter = require("./routes/todos");
const usersRouter = require("./routes/users");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

dotenv.config();

app.use(
  session({
    secret: "wet cat",
    resave: true,
    saveUninitialized: true,
  })
);
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to db"))
  .catch((error) => console.log(error));

app.use("/api/v1/todos", todosRouter);
app.use("/api/v1/users", usersRouter);

module.exports = app;
