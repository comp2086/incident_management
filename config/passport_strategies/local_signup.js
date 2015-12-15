/*
File name: local_signup.js
Author: Alex Andriishyn
Website: http://incident-management.azurewebsites.net/
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
					if(err) { // Error occurs
						return done(err);
					}					
					if(username) { // Username already exists
						return done(null, false, {
							message: 'This username is already taken'
						});
					}          			
					else { // Create a user object and save it in the DB
						var newUser = new User(req.body);
						newUser.password = newUser.generateHash(newUser.password);
						newUser.provider = 'local';
						
						newUser.save(function(err) {
							if(err) 
								throw err;						

							return done(null, newUser);
						});
					}
				});      
			} 
			else { // Already logged in
				return done(null, req.user);
			}
		});
	}));
};
