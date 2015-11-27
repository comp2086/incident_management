/**
 * Anthony Scinocco, Alex Andriishyn, Dan Masci, David Yu
 * incident-management.azurewebsites.net
 * November 23, 2015
 * Handles the logic for requests specific to the public pages of our app
 */

//home page
exports.home = function(req, res, next){
  res.render('index',{
      title: 'Incident Management'
  });
};

//process login form
//this function will need access to passport
exports.login = function(req, res, next){
    res.render('login',{
        title: 'Process user login credentials'
    });
};

//process user registration form
exports.register = function(req, res, next){
    res.render('register',{
        title: 'Create your Incident Management Account',
        page: 'register',
        username: req.user ? req.user.username : '',
        messages: req.flash('signupMessage')
    });
};
