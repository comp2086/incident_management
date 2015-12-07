/*
Anthony Scinocco, Alex Andriishyn, Dan Masci, David Yu
incident-management.azurewebsites.net
November 23, 2015
passport config file
*/

var passport = require('passport'),
    mongoose = require('mongoose');

module.exports = function() {

  var User = mongoose.model('User');

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    })
  });

  // Strategies
  require('./passport_strategies/login.js')();
};
