var firebase = require('firebase')

require('dotenv').config();

console.log(process.env)

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const MongoClient = require('mongodb').MongoClient

var milestonesRouter = require('./routes/milestones');
var blogsRouter = require('./routes/blogs');
var authRouter = require('./routes/auth');

var app = express();

export var db;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

MongoClient.connect(process.env.EMOMO_MONGO_CONNECTION_STRING, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return (console.log(err))
  }
  db = client.db(process.env.EMOMO_MONGO_DEFAULT_DB)
  // client.close();
})

app.use('/auth', authRouter);
app.use('/blogs', blogsRouter);
app.use('/milestones', milestonesRouter);

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

app.listen(3001);

module.exports = app;
