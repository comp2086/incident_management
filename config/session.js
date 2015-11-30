/**
 * Anthony Scinocco
 * incident-management.azurewebsites.net
 * November 23, 2015
 * Holds session configuration information
 */

/**
 * Basic session info that is needed to configure session
 * in app.js
 * @type {{secret: string, saveUninitialized: boolean, resave: boolean}}
 */
module.exports = {
    'secret': 'incidentManagementSecret',
    'saveUninitialized': true,
    'resave': true
};