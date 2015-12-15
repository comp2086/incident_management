/**
* Anthony Scinocco
* incident-management.azurewebsites.net
* November 23, 2015
* Handles the logic for requests specific to the user management functionality
*/

var mongoose = require('mongoose'),
    passport = require('passport'),
    User = require('../models/user.server.model.js');

// Render the login page
exports.renderLogin = function(req, res, next) {
  // User not logged in, show the login page
  if(!req.user) {
    res.render('login', {
      title: 'Login',
      messages: req.flash('error') || req.flash('info'),
      user: req.user? req.user : ''
    });
    // User already logged in, redirect to users angular app
  } else {
    return res.redirect('/userslist');
  }
};

// Login POST
exports.login = passport.authenticate('local', {
  successRedirect: '/incident',
  failureRedirect: '/login',
  failureFlash: true
});

// logout
exports.logout = function(req, res) {
	req.logout();
	res.redirect('/');
};

// Render the register page
exports.renderRegister = function(req, res, next) {
  if(!req.user) {
    res.render('register', {
      title: 'Register',
      messages: req.flash('error'),
      user: req.user? req.user : ''
    });
    // if user is already logged in, redirect to the main app page
  } else {
    return res.redirect('/');
  }
};

// Register a new user
exports.register = passport.authenticate('local-signup', {
  successRedirect: '/incident',
  failureRedirect: '/register',
  failureFlash: true
});

// Users dashboard
exports.renderUsers = function(req, res, next) {
  res.render('users', {
    title: 'Register',
    messages: req.flash('error'),
    user: req.user? req.user : ''
  });
}
