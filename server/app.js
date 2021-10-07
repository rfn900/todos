const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const todosRouter = require("./routes/todos");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");

const app = express();

const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.statusCode = 403;
    res.json({
      status: "error",
      message: "You need to be logged in to view this resource",
    });
  }
};

app.use(logger("dev"));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"], // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

dotenv.config();

app.use(
  session({
    secret: "wet cat",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000,
    },
  })
);
// Passport
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/v1", auth);
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to db"))
  .catch((error) => console.log(error));

app.use("/api/v1/todos", todosRouter);
app.use("/api/v1/users", usersRouter);
app.use("/auth", authRouter);

app.get("/", function (req, res, next) {
  res.send("ok");
});

module.exports = app;
