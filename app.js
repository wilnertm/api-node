var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require("cors");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken');
var methodOverride = require("method-override");
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {
  if (req.method != "OPTIONS") {
    if (req.originalUrl != '/api/login') {
      prueba1(req, res, next);
      // console.log("Token", req.token);
    } else {
      console.log("Error en req.originalURl");
      next();
    }
  } else {
    next();
  }
});

function prueba1(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined' || typeof bearerHeader !== null) {

    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[2];
    req.token = bearerToken;
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.status(500).send({
          message: 'error de validacion de token'
        })
        console.log(err);
        console.log("Error en middleware");
        return;
      }
      else {
        next();
      }
    });
  } else {
    console.log("Error en verifyToken");
    next();
  }

}



// view engine setup
app.use('/api/usuario/emailto/:email', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

app.use('/api/findusuario/:nombres', function (req, res, next) {
  console.log('Request Type:', req.headers);
  next();
});



app.use('/', indexRouter);
app.use('/users', usersRouter);

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
