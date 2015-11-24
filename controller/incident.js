/**
 * Anthony Scinocco
 * incident-management.azurewebsites.net
 * November 23, 2015
 * Handles the logic for requests specific to the incident management functionality
 */

//dashboard page
exports.dashboard = function(req, res, next){
    res.render('index',{
        title: 'Incident Dashboard'
    });
};

//update ticket page
exports.update = function(req, res, next){
  res.render('index',{
      title: 'Update ticket'
  });
};

//delete ticket route functionality
exports.delete = function(req, res, next){
  res.render('index', {
      title: 'Delete functionality here'
  });
};

