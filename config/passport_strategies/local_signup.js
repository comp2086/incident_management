/*
File name: local_signup.js
Author: Alex Andriishyn
Website: http://alexandriishyn.azurewebsites.net/
File description: local sign up strategy
*/

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function() {
  passport.use('local-signup', new LocalStrategy({
		passReqToCallback: true
	},
	function(req, username, password, done) {

		process.nextTick(function() {
			// Check if not already logged in
			if(!req.user) {
				User.findOne({'username': username},
				function(err, user) {
					if(err) {
						return done(err);
					}

					// Username already exists
					if(user) {
						return done(null, false, req.flash('signupMessage', 'This username is already taken'));
					}

          // Create a user object and save it in the DB
					else {
						var newUser = new User(req.body);
						newUser.password = newUser.generateHash(newUser.password);
						newUser.provider = 'local';

						newUser.save(function(err) {
							if(err) {
								throw err;
							}

							return done(null, newUser);
						});
					}
				});

      // Already logged in
			} else {
				return done(null, req.user);
			}
		});
	}));
};
