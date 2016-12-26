/**
 app.js
 author: Mykal Burris | <mykalburris@gmail.com>
 created: 21-Dec-2016
 updated: 21-Dec-2016
 version: 1
 */

// TODO: add keywords not found error

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var app = express();
app.set('view engine', 'jade');
app.set('port', (process.env.PORT || 5000));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.get('/', function(req, res) {
    res.render('index', {});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    console.log(err);
    // next(err);
});

app.listen(process.env.PORT || 3000);


module.exports = app;
