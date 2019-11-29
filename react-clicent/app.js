var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// 前端用户信息接口
var adminuser=require('./routes/admin/user')
// req.body解析前端请求
var bodyParser=require('body-parser');
// 获取解决跨域问题的插件
var cors=require('cors')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// 使用跨域问题的插件
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
// 解析req
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use('/', indexRouter);
app.use('/user', usersRouter);
// 前端用户信息管理接口
app.use('/clicent',adminuser)
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
