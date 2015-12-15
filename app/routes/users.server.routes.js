/*
File name: users.server.routes.js
Author: Alex Andriishyn
Website: http://incident-management.azurewebsites.net/
File description: users routes
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

  app.get('/users', auth.requireAuth, usersController.renderUsers)
     .post('/users', auth.requireAuth, usersController.updateUser);
};
