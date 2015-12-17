/*
Authors : Anthony Scinocco, Alex Andriishyn, Dan Masci, David Yu
Website : incident-management.azurewebsites.net

File : config/env/development.js
Description : This file sets up our DB and sessionSecret for our
			  Application while it's in development. 
*/

module.exports = {
	db: 'mongodb://localhost/incident-management-local',
	sessionSecret: 'incidentManagementSecret'
}
