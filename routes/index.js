/**
 * Anthony Scinocco
 * incident-management.azurewebsites.net
 * November 23, 2015
 * Handles routing for all public page related url request
 */
var express = require('express');
var router = express.Router();

//grab the index controller
var indexController = require('../controller/index');

/* GET home page. */
router.get('/', indexController.home);

//login post route
//in our html login form use "/login" as the route to submit to, so action="/login"
router.post('/login', indexController.login);

//registration post route
//in our html registration form use "/register" as the route to submit to, so action="/register"
router.post('/register', indexController.register);

module.exports = router;
