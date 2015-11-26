var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require('passport');

//database configuration
var db = require('./config/db');
mongoose.connect(db.url);

//check for db connection errors
mongoose.connection.on('error', function(){
  console.log('MongoDB Connection Error');
});


var routes = require('./routes/index');
var users = require('./routes/users');
//added route handler for incident requests
var incidents =  require('./routes/incident');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//configure session
var sessionAttributes = require('./config/session');
app.use(session({
  secret: sessionAttributes.secret,
  saveUninitialized: sessionAttributes.saveUninitialized,
  resave: sessionAttributes.resave
}));

//configure flash
app.use(flash());

//configure passport
app.use(passport.initialize());
app.use(passport.session());

//configure routes
app.use('/', routes);
app.use('/users', users);
//use custom incident routes
app.use('/incident', incidents);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
