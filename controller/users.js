/**
* Anthony Scinocco
* incident-management.azurewebsites.net
* November 23, 2015
* Handles the logic for requests specific to the user management functionality
*/

// Authentication check
function requireAuth(req, res, next) {
  if(!req.isAuthenticated()) {
    return res.redirect('/signin');
  }
  next();
}

// Render home page with a list of all users
// NOTE: in future, this should be based on user's role
exports.renderIndex = function(req, res, next) {
  requireAuth;
  User.find(function(err, users) {
    if(err) {
      console.log(err);
      res.end(err);
    } else {
      res.render('users/index', {
        title: 'Users list',
        usersCollection: users
      });
    }
  }).sort({ firstname : 1}); // ('-1' - desc)
};

exports.update = function(req, res, next){
  res.render('index',{
    title: 'User Management'
  });
};
