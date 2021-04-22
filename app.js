var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const exphbs = require('express-handlebars');
const handlebars = require('./util/handlebars')(exphbs);

var authRouter = require('./routes/auth');
var userRouter = require('./routes/user');
var accountRouter = require('./routes/account');
var transactRouter = require('./routes/transact');
var authorizeTransferRouter = require('./routes/authorizeTransfer');
var EOLRouter = require('./routes/EOL'); 
var indexRouter = require('./routes/index'); 
// Auth, User, Account, Transactions


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Put new routes before last app.use
app.use('/api/v2/authorizeTransfer', authorizeTransferRouter);
app.use('/api/v2/auth', authRouter);
app.use('/api/*/user', userRouter);
app.use('/api/v2/account', accountRouter);
app.use('/api/v2/transact', transactRouter);
app.use('/api/v1/*', EOLRouter);
app.use('/', indexRouter);

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
