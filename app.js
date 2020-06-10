const fileUpload = require("express-fileupload");
const express = require("express");
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const moovsRouter = require("./routes/moovs");
const newsRouter = require("./routes/news");
const eventRouter = require("./routes/event");

require("./models/bdd");

const app = express();

// cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  // res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, content-type, application/json, Authorization");
  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(fileUpload({ useTempFiles: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/moovs", moovsRouter);
app.use("/news", newsRouter);
app.use("/event", eventRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  if (res.headerSent) {
    return next(err);
  }
  // render the error page
  res.status(err.status || 500);
  res.json({ message: err.message || "An unknown error occurred!" });

  
});

module.exports = app;
