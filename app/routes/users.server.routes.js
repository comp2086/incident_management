/**
* Anthony Scinocco
* incident-management.azurewebsites.net
* November 23, 2015
* Handles routing for all user related url request
*/
'use strict';

var usersController = require('../controllers/users.server.controller.js'),
    passport = require('passport');

module.exports = function(app) {

  app.route('/login')
     .get(usersController.renderLogin)
	   .post(passport.authenticate('local', {
       successRedirect: '/incident',
       failureRedirect: '/login',
       failureFlash: true
	   }));

  app.route('/register')
     .get(usersController.renderRegister)
     .post(usersController.register);

  app.get('/logout', usersController.logout);

  app.route('/users')
     .get(usersController.list);
};
