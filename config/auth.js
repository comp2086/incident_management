/**
 * Modified By: Anthony Scinocco
 * incident-management.azurewebsites.net
 * November 30, 2015
 * Update: changed the way the function is being exported, because node was complaining
 * that it was recieving an object not a function
 */
var passport = require('passport');

// Authentication check
exports.requireAuth = function(req, res, next) {
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
};