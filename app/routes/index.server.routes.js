/*
Authors : Anthony Scinocco, Alex Andriishyn, Dan Masci, David Yu
Website : incident-management.azurewebsites.net

File : incident.server.routes.js
Description : Handles routing for all public page related url request 
*/

'use strict';

var indexController = require('../controllers/index.server.controller.js');

module.exports = function(app) {
  
  app.get('/', indexController.home);
};
