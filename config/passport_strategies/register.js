/**
 * Anthony Scinocco, Alex Andriishyn, Dan Masci, David Yu
 * incident-management.azurewebsites.net
 * November 23, 2015
 * registration strategy
 */

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function() {
  passport.use('register', new LocalStrategy({
		passReqToCallback: true
	},
	function(req, username, password, done) {
		process.nextTick(function() {
			// If you aren't logged in
			if(!req.user) {
				User.findOne({'username': username},
				function(err, user) {
					if(err) {
						return done(err);
					}
					// Username already exists
					if(user) {
						return done(null, false, req.flash('registerMessage', 'This username is already taken'));
					}
			        // Create a user and save it in the DB
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
