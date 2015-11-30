
var passport =  require('passport')

// Authentication check
module.exports = function requireAuth(req, res, next) {
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
};