var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require("cors");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var methodOverride = require("method-override");
var bodyParser = require('body-parser');


//middleware
// app.use(verifyToken,function (req, res, next) {
//   console.log('Time:', Date.now());
//   console.log('Request URL:', req.originalUrl);
//   if (req.originalUrl != '/api/login') {

//     console.log("Verificando token");

//     jwt.verify(req.token, 'secretkey', (err, authData) => {
//       if (err) {
//         res.sendStatus(403);
//         console.log(err);
//         console.log("Error en middleware");
//       } else {
//         res.json({
//           message: 'Post created...',
//           authData,
//           jwt: req.token
//         });
//       }
//     });
//   }
//   next();
// });
app.use(function (req, res, next) {
  if (req.method != "OPTIONS") {
    console.log('Encabezados', req.headers);
    console.log('URL', req.originalUrl);
    console.log("method", req.method)
    if (req.originalUrl != '/api/login') {
      prueba
      console.log("Requires");
      console.log("Token", req.token);
      console.log("Autorizacion", req.headers['authorization']);
      next();
    } else {
      next();
    }
  } else {
    next();
  }

});


function prueba(req, res, next) {
  console.log("Dentro de Prueba", req.headers);
  verifyToken
  next();
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      // res.sendStatus(403);
      console.log(err);
      console.log("Error en middleware");
      return;
    } else {
      res.json({
        message: 'Post created...',
        authData,
        jwt: req.token
      });
    }
  });
  next();
}






// app.use('api/usuario/:id', function(req, res, next) {
//   // console.log('Request URL:', req.originalUrl);
//   console.log('Request:' ,req.body.id);

//   next();
// }, function (req, res, next) {
//   console.log('Request Type:', req.method());
//   next();
// });


//Verificador de sesion
function verifyToken(req, res, next) {
  console.log("Dentro de verify", req.headers);
  console.log("Verify Body", req.body);
  // Trae los valores del encabezado
  const bearerHeader = req.headers['authorization'];
  // Verifica si el bearer esta definido o no
  if (typeof bearerHeader !== 'undefined') {
    //Se eliminan los espacios del bearer si se tiene
    const bearer = bearerHeader.split(' ');
    // Trae los valores del arreglo
    const bearerToken = bearer[1];
    // Edita el token
    req.token = bearerToken;
    // Siguiente ejecución del middleware
    next();
  } else {
    // Respuesta si los valores no son validos Forbidden
    // res.sendStatus(403);
    console.log("Error en verifyToken");
    next();
  }
}

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

app.use('/api/findusuario/:nombres', function (req, res, next) {
  console.log('Request Type:', req.headers);
  next();
});

app.use((req, res, next) => {
  if (req.body.hasOwnProperty("nombres")) {
    console.log(req.body)
  }
  next();
});


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
