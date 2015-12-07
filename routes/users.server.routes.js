/**
 * Anthony Scinocco
 * incident-management.azurewebsites.net
 * November 23, 2015
 * Handles routing for all user related url request
 */
var express = require('express'),
    router = express.Router(),
    auth = require('../config/auth.js'),
    users = require('../controller/users.server.routes.js');

// Regular routes
router.get('/login', users.renderLogin);
router.get('/register', users.renderRegister);
router.post('/register', users.register);

// Angular routes
router.get('/users', users.list);

module.exports = router;
