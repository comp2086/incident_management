/**
* Anthony Scinocco
* incident-management.azurewebsites.net
* November 23, 2015
* Handles routing for all incident related url request
*/
'use strict';

var incidentController = require('../controllers/incident.server.controller.js'),
		auth = require('../../config/auth.js');

module.exports = function(app) {
	app.get('/incident', auth.requireAuth, incidentController.dashboard);

	app.route('/incident/add')
		 .get(auth.requireAuth, incidentController.add)
		 .post(auth.requireAuth, incidentController.processAdd);

	app.route('/incident/update/:id')
		 .get(auth.requireAuth, incidentController.update)
		 .post(auth.requireAuth, incidentController.processUpdate);

	app.get('/incident/delete/:id?', auth.requireAuth, incidentController.delete);

	app.get('/incident/filter/:filter', auth.requireAuth, incidentController.dashboard);
};
