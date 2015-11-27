/**
 * Anthony Scinocco
 * incident-management.azurewebsites.net
 * November 23, 2015
 * Handles routing for all user related url request
 */
var express = require('express'),
    router = express.Router();


// User controller
var usersController = require('../controller/users');

// Users home page
router.get('/', usersController.renderIndex)

//grab the user id from the route(pass it into the route from the session?) and use it to
//grab the user profile from the db
//router.get('/:id', usersController.update);

module.exports = router;
