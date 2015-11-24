/**
 * Anthony Scinocco
 * incident-management.azurewebsites.net
 * November 23, 2015
 * Handles routing for all user related url request
 */
var express = require('express');
var router = express.Router();


//grab the user controller
var usersController = require('../controller/users');

//grab the user id from the route(pass it into the route from the session?) and use it to
//grab the user profile from the db
router.get('/:id', usersController.update);

module.exports = router;
