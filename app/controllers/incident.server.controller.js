/**
 * Anthony Scinocco
 * incident-management.azurewebsites.net
 * November 23, 2015
 * Handles the logic for requests specific to the incident management functionality
 */

//need the ticket model to create new tickets
var Ticket = require('../models/ticket.server.model');
var User = require('../models/user.server.model');
//used for generating unique user friendly id's
var shortId = require('shortid');

//this calculates the severity of tickets based
// based on weighted values for eac variable
var calculateSeverity = function(impact, urgency, priority){
    return ((impact) * ((urgency * 0.75) + (priority * 0.50)));
};

var createReferenceId = function(){
    //create date object
    var today = new Date();
    var formatDay = today.getDate();

    if(formatDay < 10) {
        formatDay = '0' + formatDay.toString();
    }

    return today.getFullYear().toString() + (today.getMonth() + 1).toString()
            + formatDay + '-' + shortId.generate();
};

//dashboard page
exports.dashboard = function(req, res, next){
console.log('adasdada');
    if(req.user.role == 1){//show this if the user is a client
        //find all tickets that belong to the one logged in user
        Ticket.find({username: req.user.username})
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

//Update Ticket page
//Client are not allowed to update their tickets directly
exports.update = function(req, res, next){
  if(req.user.role == 2) {//admin update page
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
          }
     });
  }
  else {
      next();
  }
};

//processes the submitted updated ticket
exports.processUpdate = function(req, res, next){
    var checkResolution = function() {
        if (req.body.resolution === '')
            return false;
        else
            return true;
    }
    //manually populate ticket data
    //so that the nest narrative document is
    //properly filled out
    var ticket = new Ticket({
        //need to overwrite object id with its own id from the url
        //or else mongo tries to assign a new object id which then
        //throws an error and crashes the app
        _id: req.params.id,
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status,
        isUrgent: req.body.isUrgent,
        urgency: req.body.urgency,
        impact: req.body.impact,
        title: req.body.title,
        resolution: {
            exists: checkResolution(),
            body: req.body.resolution
        },
        severity: calculateSeverity(req.body.impact, req.body.urgency, req.body.priority),
        narrative: {
            id: createReferenceId(),
            timeStamp: Date.now(),
            username: req.user.username,
            comment: req.body.comment,
            body: req.body.narrativeBody
        }
    });

    //update the selected ticket
    Ticket.update({_id: req.params.id}, ticket, function(err){
        if(err){
            console.log(err);
            res.end(err);
        }else {
            res.redirect('/incident/')
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
        Ticket.create({
            username: req.user.username,
            description: req.body.description,
            title: req.body.title,
            referenceId: createReferenceId(),
            //defaults are provided as clients cannot change this information
            severity: calculateSeverity(1, 1, 1),
            narrative: {
                id: createReferenceId(),
                timeStamp: Date.now(),
                username: req.user.username,
                comment: '(CREATED TICKET)'
            }
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
            username: req.body.username,
            description: req.body.description,
            priority: req.body.priority,
            isUrgent: req.body.isUrgent,
            urgency: req.body.urgency,
            impact: req.body.impact,
            title: req.body.title,
            referenceId: createReferenceId(),
            severity: calculateSeverity(req.body.impact, req.body.urgency, req.body.priority),
            narrative: {
                id: createReferenceId(),
                timeStamp: Date.now(),
                username: req.user.username,
                comment: 'CREATED TICKET'
            }
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
