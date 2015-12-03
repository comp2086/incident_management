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

    if(req.user.role == 1){//show this if the user is a client
        //find all tickets that belong to the one logged in user
        Ticket.find({userId: req.user._id}, function(err, ticket){
            res.render('tickets/index',{
                title: 'Client Incident Dashboard',
                tickets: ticket
            });
        });
    }else if (req.user.role == 2) {//show this if the user is an admin
        //finds all the tickets
        //sends ticket json array to the tickets variable on the incident dashboard
        Ticket.find({}, function (err, ticket) {
            res.render('tickets/index', {
                title: 'Admin Incident Dashboard',
                tickets: ticket
            });
        });
    }
};

//update ticket page
//need 2 seperate views here because
//clients cannot update all the same fields
//as admins can
exports.update = function(req, res, next){

  if(req.user.role == 1) {//client update page
      Ticket.find({userId: req.user._id}, function(err, ticket){
          res.render('tickets/client-update',{
              title: 'Update your ticket',
              tickets: ticket
          });
      });
  }else if(req.user.role == 2) {//admin update page
      res.render('tickets/update',{
          title: 'Update the users ticket'
      });
  }
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
        status: req.body.status,
        isUrgent: req.body.isUrgent
    }, function(err, Ticket){
        if(err){
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/incident');
        }
    });
};

