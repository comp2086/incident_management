/**
* Anthony Scinocco
* incident-management.azurewebsites.net
* November 23, 2015
* Handles the logic for requests specific to the user management functionality
*/

var mongoose = require('mongoose'),
    passport = require('passport');

var User = require('../models/user.server.model.js');

                          /******************/
                          /* REGULAR ROUTES */
                          /******************/

// Error handler
var getErrorMessage = function(err) {
  var message = null;

  // If an internal MongoDB error occurs get the error message
  if(err.code) {
    switch(err.code) {
      // If a unique index error occurs set the message error
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      // If a general error occurs set the message error
      default:
        message = 'Something went wrong';
    }
  } else {
    // Grab the first error message from a list of possible errors
    for(var errName in err.errors) {
      if(err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  return message;
};

// Render the login page
exports.renderLogin = function(req, res, next) {
  // User not logged in, show the login page
  if(!req.user) {
    res.render('login', {
      title: 'Login',
      messages: req.flash('error') || req.flash('info')
    });
    // User already logged in, redirect to users angular app
  } else {
    return res.redirect('/users');
  }
};

// Render the register page
exports.renderRegister = function(req, res, next) {
  if(!req.user) {
    res.render('register', {
      title: 'Register',
      messages: req.flash('error')
    });
    // if user is already logged in, redirect to the main app page
  } else {
    return res.redirect('/');
  }
};

// Register a new user
exports.register = function(req, res, next) {
  if(!req.user) {
    var message = null;
    var user = new User(req.body);

    user.provider = 'local';
    user.password = user.generateHash(req.body.password);

    user.save(function(err) {
      if(err) {
        message = getErrorMessage(err);
        req.flash('error', message);
        return res.redirect('/register');
      }

      // If the user was created successfully use the Passport 'login' method to login
      req.login(user, function(err) {
        if(err) return next(err);
        return res.redirect('/');
      });
    });
  } else {
    return res.redirect('/');
  }
};



                          /**********************/
                          /* ANGULAR APP ROUTES */
                          /**********************/

// Error handler
var getNgErrorMessage = function(err) {
  if(err.errors) {
    for(var errName in err.errors) {
      if(err.errors[errName].message) return err.errors[errName];
    }
  } else {
    return 'Unknown server error';
  }
};

// Create a new user
exports.create = function(req, res) {
  var user = new User(req.body);

  user.provider = 'local';
  user.password = user.generateHash(req.body.password);

  user.save(function(err) {
    if(err) {
      return res.status(400).send({
        message: getNgErrorMessage(err)
      });
    } else {
      res.json(user);
    }
  });
};

// List all users
exports.list = function(req, res) {
  User.find().sort('-lastName').exec(function(err, users) {
    if(err) {
      return res.status(400).send({
        message: getNgErrorMessage(err)
      });
    } else {
      res.json(users);
    }
  });
};

// Find user by ID
exports.userById = function(req, res, next, id) {
  User.findById(id).exec(function(err, user) {
    if(err) return next(err);
    if(!user) return next(new Error('Failed to find user ' + id));

    req.user = user;
    next();
  });
};

exports.read = function(req, res) {
  res.json(req.user);
}

// Update user
exports.update = function(req, res) {
  var user = req.user;

  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.username = req.body.username;
  user.password = user.generateHash(req.body.password);
  user.provider = 'local';

  user.save(function(err) {
    if(err) {
      return res.status(400).send({
        message: getNgErrorMessage(err)
      });
    } else {
      res.json(user);
    }
  });
};

// Delete user
exports.delete = function(req, res) {
  var user = req.user;

  user.remove(function(err) {
    if(err) {
      return res.status(400).send({
        message: getNgErrorMessage(err)
      });
    } else {
      res.json(user);
    }
  });
};
