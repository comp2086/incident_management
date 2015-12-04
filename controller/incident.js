/**
 * Anthony Scinocco
 * incident-management.azurewebsites.net
 * November 23, 2015
 * Handles the logic for requests specific to the incident management functionality
 */

//need the ticket model to create new tickets
var Ticket = require('../models/ticket');
var User = require('../models/user');
var shortId = require('shortid');

//this calculates the severity of tickets based
// based on weighted values for eac variable
var calculateSeverity = function(impact, urgency, priority){
    return ((impact) * ((urgency * 0.75) + (priority * 0.50)));
};


//dashboard page
exports.dashboard = function(req, res, next){

    if(req.user.role == 1){//show this if the user is a client
        //find all tickets that belong to the one logged in user
        Ticket.find({client: req.user.username})
            .sort({createdAt: 'desc'})
            .exec(function(err, ticketList){
            res.render('tickets/index',{
                title: 'Client Incident Dashboard',
                tickets: ticketList,
                user: req.user
            });
        });
    }else if (req.user.role == 2) {//show this if the user is an admin
        //finds all the tickets
        //sends ticket json array to the tickets variable on the incident dashboard
        Ticket.find({})
            .sort({createdAt: 'desc'})
            .exec(function (err, ticketList) {
            res.render('tickets/index', {
                title: 'Admin Incident Dashboard',
                tickets: ticketList,
                user: req.user
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
      //gets id parameter from url string
      Ticket.findById(req.params.id, function(err, ticket){
          if(err){
              console.log(err);
              res.end(err);
          }else {
              res.render('tickets/update-client', {
                  title: 'Update your ticket',
                  ticket: ticket,
                  user: req.user
              });
          }});
  }else if(req.user.role == 2) {//admin update page
      //gets id parameter from url string
      Ticket.findById(req.params.id, function(err, ticket) {
          if(err){
              console.log(err);
              res.end(err);
          }else {
              res.render('tickets/update-admin', {
                  title: 'Update the users ticket',
                  ticket: ticket,
                  user: req.user
              });
          }});
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
    if(req.user.role == 1){
        res.render('tickets/add-client',{
            title: 'Add a ticket',
            user: req.user
        });
    }else if(req.user.role == 2){
        //query all users to populate client username dropdown box
        User.find({}, function(err, users){
            res.render('tickets/add-admin',{
                title: 'Add a ticket',
                user: req.user,
                userList: users
            });
        });
    }
};

//processes submitted user data to add ticket
exports.processAdd = function(req, res, next){
    if(req.user.role == 1) {
        var ticket = new Ticket(req.body);
        //default values are passed in when a client creates
        //a ticket
        Ticket.create({
            client: req.user.username,
            description: req.body.description,
            priority: 1,
            status: 'Open',//sets the default status to open
            isUrgent: req.body.isUrgent,
            urgency: 1,
            impact: 1,
            title: req.body.title,
            referenceId: shortId.generate(),
            //defaults are provided as clients cannot change this information
            severity: calculateSeverity(1, 1, 1)
        }, function(err, Ticket){
            if(err){
                console.log(err);
                res.end(err);
            } else {
                res.redirect('/incident');
            }
        });
    }else if(req.user.role == 2){
        var ticket = new Ticket(req.body);
        Ticket.create({
            client: req.body.client,
            description: req.body.description,
            priority: req.body.priority,
            status: 'Open',//sets the default status to open
            isUrgent: req.body.isUrgent,
            urgency: req.body.urgency,
            impact: req.body.impact,
            title: req.body.title,
            referenceId: shortId.generate(),
            severity: calculateSeverity(req.body.impact, req.body.urgency, req.body.priority)
        }, function(err, Ticket){
            if(err){
                console.log(err);
                res.end(err);
            } else {
                res.redirect('/incident');
            }
        });
    }
};

