var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var routes = require('./routes/index');
var stayRouter = require('./routes/stay');
var roomRouter = require('./routes/room');
var empRouter = require('./routes/employee');


var app = express();

// view engine setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/', routes);
app.use('/api/stay', stayRouter);
app.use('/api/room', roomRouter);
app.use('/api/employee', empRouter);

+
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


module.exports = app;