/*
Authors : Anthony Scinocco, Alex Andriishyn, Dan Masci, David Yu
Website : incident-management.azurewebsites.net

File : config/passport_strategies/login.js
Description : This is our login strategy that uses Passport to
              validate the credentials given by the User.
*/


var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function() {
  passport.use(new LocalStrategy(function(username, password, done) {
    process.nextTick(function() {
        User.findOne({
          'username': username
        },
        function(err, user) {
          if(err) {
            return done(err);
          }
          // No user found
          if(!user) {
            return done(null, false, {
              message: 'Username does not exist'
            });
          }
          // Incorrect password
          if(!user.validPassword(password)) {
            return done(null, false, {
              message: 'Incorrect password'
            });
          }

          // Log in
          return done(null, user);
        });
      });
  }));
};
