var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var logger = require('morgan');
var bodyParser = require('body-parser');
var handlePath = require('./middleWare/handlePath');
var logger = require('./middleWare/logger');
var dataChecker = require('./middleWare/dataChecker');
var returnData = require('./middleWare/returnData');

// var indexRouter = require('./routes/index');

var app = express();

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,token");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  if (req.method == "OPTIONS") res.sendStatus(200);
  else next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use((req, res, next) => handlePath(req, res, next));
app.use((req, res, next) => logger(req, res, next));
app.use((req, res, next) => dataChecker(req, res, next));
app.use((req, res, next) => returnData(req, res, next));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// app.use('*', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
