var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors=require("cors"); 
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var methodOverride = require("method-override");
var bodyParser = require('body-parser');


//middleware
app.use(function (req, res, next) {
  console.log('Time:',Date.now());
  next();
});

// app.use('api/usuario/:id', function(req, res, next) {
//   // console.log('Request URL:', req.originalUrl);
//   console.log('Request:' ,req.body.id);
  
//   next();
// }, function (req, res, next) {
//   console.log('Request Type:', req.method());
//   next();
// });



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());


app.use('/api/usuario/emailto/:email', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

app.use('/api/authenticate', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

app.use((req,res,next)=>{
  if (req.body.hasOwnProperty("email")){
    console.log(req.body.email)
  }
  next();
});


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
