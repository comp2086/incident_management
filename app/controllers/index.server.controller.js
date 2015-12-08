/**
 * Anthony Scinocco, Alex Andriishyn, Dan Masci, David Yu
 * incident-management.azurewebsites.net
 * November 23, 2015
 * Handles the logic for requests specific to the public pages of our app
 */

// Home GET
exports.home = function(req, res, next){
  //If user is logged in - redirect to backend dashboard
  if (req.user) {
    //This page is yet to be created. Just an example.
    res.redirect('incident');
  }
  //If user isn't logged in - redirect to login page
  else {
    res.redirect('login');
  }
};
