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
  passport.use('local-signin', new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done) {

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
            return done(null, false, req.flash('signinMessage', 'Incorrect username'));
          }

          // Incorrect password
          if(!user.validPassword(password)) {
            return done(null, false, req.flash('signinMessage', 'Incorrect password'));
          }

          // Log in
          return done(null, user);

        }) // End of findOne
      }); // End of process
  }));
}
