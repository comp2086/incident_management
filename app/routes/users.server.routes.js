/**
* Anthony Scinocco
* incident-management.azurewebsites.net
* November 23, 2015
* Handles routing for all user related url request
*/
'use strict';

var usersController = require('../controllers/users.server.controller.js'),
    passport = require('passport'),
    auth = require('../../config/auth.js');

module.exports = function(app) {

  app.route('/login')
     .get(usersController.renderLogin)
	   .post(usersController.login);

  app.route('/register')
     .get(usersController.renderRegister)
     .post(usersController.register);

  app.get('/logout', usersController.logout);
  app.route('/userslist').get(auth.requireAuth, usersController.renderUsers);
  app.route('/users').get(auth.requireAuth, usersController.list)
  app.param('userId', usersController.userById);
};
