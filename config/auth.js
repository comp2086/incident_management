/*
Authors : Anthony Scinocco, Alex Andriishyn, Dan Masci, David Yu
Website : incident-management.azurewebsites.net
Last Updated : November 30th, 2015 by Anthony

File : config/auth.js
Description : This file includes 2 functions that authenticate
              1) if there is an authenticated user logged in
              and 2) if the current user is an Admin. These functions
              are used in various places in our routing to keep
              certain views hidden from unwanted users.
*/



var passport = require('passport');

// Authentication check
exports.requireAuth = function(req, res, next) {
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
};

// Check if the user is an Admin
exports.requireAdmin = function(req, res, next) {
    if(req.user.role == 1) {
        //if client - redirect to incident dashboard
        return res.redirect('/incident');
    }
    //else, continue with next action
    next();
};