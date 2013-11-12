
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var about_page = require('./routes/about');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB related info
// var mongo = require('mongodb');
// var monk = require('monk');
// var db = monk('localhost:27017/lt'); // lt is the currently used database
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/lt');
// db.on('error', console.error.bind(console, "Connection Error: "));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/about', about_page.about);
app.get('/contact', about_page.contact);
app.get('/users', user.list);
app.get('/userlist', user.userlist(db));
app.get('/newuser', user.newuser)
app.post('/adduser', user.adduser(db))
app.get('/remove/:id', user.removeuser(db))

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
