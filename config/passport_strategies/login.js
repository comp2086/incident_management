/**
 * Anthony Scinocco, Alex Andriishyn, Dan Masci, David Yu
 * incident-management.azurewebsites.net
 * November 23, 2015
 * local login strategy
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
