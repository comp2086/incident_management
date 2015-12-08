/**
 * Anthony Scinocco
 * incident-management.azurewebsites.net
 * November 23, 2015
 * Handles routing for all public page related url request
 */
'use strict';

var indexController = require('../controllers/index.server.controller.js');

module.exports = function(app) {
  
  app.get('/', indexController.home);
};
