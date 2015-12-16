'use strict';

// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Load the module dependencies
var mongoose = require('./config/mongoose'),
	express = require('./config/express'),
	passport = require('./config/passport'),
	http = require('http');

var app = express();

// Create a new Mongoose connection instance
var db = mongoose();

// Configure the Passport middleware
var passport = passport();

// Use the Express application instance to listen to the '3000' port
app.set('port', 3000);

var server = http.createServer(app);

server.listen(3000);
//server.on('error', onError);
//server.on('listening', onListening);

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;
