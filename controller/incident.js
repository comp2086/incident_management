/**
 * Anthony Scinocco
 * incident-management.azurewebsites.net
 * November 23, 2015
 * Handles the logic for requests specific to the incident management functionality
 */

//need the ticket model to create new tickets
var Ticket = require('../models/ticket');

//dashboard page
exports.dashboard = function(req, res, next){
    //sends ticket json array to the tickets variable on the incident dashboard
    Ticket.find({}, function(err, ticket){
        res.render('tickets/index',{
            title: 'Incident Dashboard',
            tickets: ticket
        });
    });
};

//update ticket page
exports.update = function(req, res, next){
  res.render('index',{
      title: 'Update ticket'
  });
};

//processes the submitted updated ticket
exports.processUpdate = function(req, res, next){

};

//delete ticket route functionality
exports.delete = function(req, res, next){
    var id = req.params.id;
    Ticket.remove({_id: id}, function(err){
        if(err){
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/incident/');
        }
    });
};

//provides page for user add ticket
exports.add = function(req, res, next){
    res.render('tickets/add',{
        title: 'Add a ticket'
    });
};

//processes submitted user data to add ticket
exports.processAdd = function(req, res, next){
    var ticket = new Ticket(req.body);
    Ticket.create({
        userId: req.user._id,
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status
    }, function(err, Ticket){
        if(err){
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/incident');
        }
    });
};

