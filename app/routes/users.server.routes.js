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

  // Load Angular Users app
  app.route('/userslist')
     .get(auth.requireAuth, usersController.renderUsers);

  // Load all users
  app.route('/users')
     .get(auth.requireAuth, usersController.list)
     .post(auth.requireAuth, usersController.create);

  // Manipulate single user
  app.param('userId', usersController.userById);
  app.route('/userslist/:userId')
     //.get(auth.requireAuth, usersController.read)
     .put(auth.requireAuth, usersController.update)
     .delete(auth.requireAuth, usersController.delete);


};
