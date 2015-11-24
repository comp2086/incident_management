/**
 * Anthony Scinocco
 * incident-management.azurewebsites.net
 * November 23, 2015
 * Handles routing for all incident related url request
 */
var express = require('express');
var router = express.Router();


//grab the incident controller
var incidentController = require('../controller/incident');

//grab the ticket dashboard
router.get('/', incidentController.dashboard);

//display a ticket update view based on ticket id
router.get('/update/:id?', incidentController.update);

//allow the user to delete tickets based on id
router.post('/delete/:id?', incidentController.delete);

module.exports = router;