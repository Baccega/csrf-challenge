const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const LocalStorage = require("node-localstorage").LocalStorage;
const uuid = require("uuid");

const localStorage = new LocalStorage("./data");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(bodyParser.text({type: '*/*'}));
app.use(express.static(path.join(__dirname, "public")));

/* GET home page. */
app.get("/", function(req, res, next) {
  res.render("index");
});

/* POST a new page. */
app.post("/page", function(req, res, next) {
  const id = uuid.v4();
  localStorage.setItem(id, req.body);
  res.redirect("/page/" + id);
});

/* GET a page. */
app.get("/page/:id", function(req, res, next) {
  const page = localStorage.getItem(req.params.id);
  res.send(page);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
