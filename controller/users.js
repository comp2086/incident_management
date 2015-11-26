/**
 * Anthony Scinocco
 * incident-management.azurewebsites.net
 * November 23, 2015
 * Handles the logic for requests specific to the user management functionality
 */

//edit user profile page
//take the user id and load the profile based on the id
//pull in firstname, lastname, etc and populate it into
//an html form that allows users to update their profile
exports.update = function(req, res, next){
    res.render('index',{
        title: 'User Management'
    });
};