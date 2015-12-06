/**
* Anthony Scinocco
* incident-management.azurewebsites.net
* November 23, 2015
* Handles the logic for requests specific to the user management functionality
*/

var mongoose = require('mongoose'),
    User = require('/models/user.server.model.js'),
    Auth = require('/config/auth.js');


// Error handling
var getErrorMessage = function(err) {
  if(err.errors) {
    for(var errName in err.errors) {
      if(err.errors[errName].message)
        return err.errors[errName].message;
    }
  } else {
    return 'Unknown server error';
  }
};

// Create a new user
exports.create = function(req, res) {
  var user = new User(req.body);
  user.save(function(err) {
    if(err) {
      return res.status(400).send({
        message: getErrorMessage(err)
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
        message: getErrorMessage(err)
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

// Update existing user
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
        message: getErrorMessage(err)
      });
    } else {
      res.json(user);
    }
  });
};

exports.delete = function(req, res) {
  var user = req.user;

  user.remove(function(err) {
    if(err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(user);
    }
  });
};
