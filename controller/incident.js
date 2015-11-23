/**
 * Anthony Scinocco
 * incident-management.azurewebsites.net
 * November 23, 2015
 * Handles the logic for requests specific to the incident management functionality
 */

//home page
exports.home = function(req, res, next){
    res.render('index',{
        title: 'Incident Dashboard'
    });
};