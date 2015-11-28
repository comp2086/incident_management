/**
 * Anthony Scinocco, Alex Andriishyn, Dan Masci, David Yu
 * incident-management.azurewebsites.net
 * November 23, 2015
 * Handles the logic for requests specific to the public pages of our app
 */

var passport = require('passport');

// Home GET
exports.home = function(req, res, next){
  res.redirect('login');
};


// Login page GET
exports.renderLogin = function (req, res, next) {
  res.render('login', {
      title: 'Login to your Incident Management Account',
      page: 'login',
      username: req.user ? req.user.username : '',
      messages: req.flash('signinMessage')
  });
};
// Login POST
exports.login = passport.authenticate('login', {
  successRedirect: '/users',
  failureRedirect: '/login',
  failureFlash: true
});


// Register page GET
exports.renderRegister = function(req, res, next){
    res.render('register', {
        title: 'Create your Incident Management Account',
        page: 'register',
        username: req.user ? req.user.username : '',
        messages: req.flash('signupMessage')
    });
};
// Register page POST
exports.register = passport.authenticate('register', {
  successRedirect: '/users',
  failureRedirect: '/register',
  failureFlash: true
});
