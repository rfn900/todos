const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const todosRouter = require("./routes/todos");
const notesRouter = require("./routes/notes");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const mongoose = require("mongoose");
const guard = require("./middlewares/guard");
const app = express();

dotenv.config();
app.use(logger("dev"));
app.use(
  cors({
    origin: [`${process.env.CLIENT_URL}`], // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//This middleware will protect all api private routes
app.use("/api/v1", guard);

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to db"))
  .catch((error) => console.log(error));

app.use("/api/v1/todos/lists", todosRouter);
app.use("/api/v1/todos/notes", notesRouter);
app.use("/api/v1/users", usersRouter);
app.use("/auth", authRouter);

app.get("/", function (req, res, next) {
  res.send("ok");
});

module.exports = app;
