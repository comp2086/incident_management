/*
Authors : Anthony Scinocco, Alex Andriishyn, Dan Masci, David Yu
Website : incident-management.azurewebsites.net

File : config/env/production.js
Description : This file sets up our DB and sessionSecret for our
			  Application when we switch to production. 
*/

module.exports = {
	db: 'mongodb://daad:advancedweb@ds054288.mongolab.com:54288/production',
	sessionSecret: 'incidentManagementSecret'
}
