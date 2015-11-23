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

/* GET home page. */
router.get('/', incidentController.home);

module.exports = router;