/**
 * Anthony Scinocco
 * incident-management.azurewebsites.net
 * November 23, 2015
 * Handles routing for all public page related url request
 */

var express = require('express'),
    router = express.Router();

// Controller
var indexController = require('../controller/index');

// Home page
router.get('/', indexController.home);

// Login page
router.get('/login', indexController.renderLogin);
router.post('/login', indexController.login);

// Register page
router.get('/register', indexController.renderRegister);
router.post('/register', indexController.register);

module.exports = router;
