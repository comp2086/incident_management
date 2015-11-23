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

/* GET users listing. */
router.get('/', usersController.home);

module.exports = router;
