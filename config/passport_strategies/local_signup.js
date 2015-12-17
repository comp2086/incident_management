/*
Authors : Anthony Scinocco, Alex Andriishyn, Dan Masci, David Yu
Website : incident-management.azurewebsites.net

File : config/passport_strategies/local_signup.js
Description : This is our local registration strategy that uses
              Passport to validate a new user can be created with
              the given data.
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
                        return done(null, false, {
                            message: 'This username is already taken'
                        });
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
            } 
            else { // Already logged in
                return done(null, req.user);
            }
        });
    }));
};