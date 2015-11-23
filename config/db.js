/**
 * Anthony Scinocco
 * incident-management.azurewebsites.net
 * November 23, 2015
 * holds database information
 */

/**
 * holds the database connection strings
 * Uncomment the one you need and comment out
 * the ones you don't.
 *
 * We can probably set an env variable and use an if to handle
 * this but for now just use what you need
 * @type {{url: string}}
 */
module.exports = {
    //local database
    //'url':'mongodb://localhost/incident-management-local'
    //development database
    //'url':'waiting for url'
    //production database
    'url':'mongodb://<daad>:<advancedweb>@ds054288.mongolab.com:54288/incidentmanagement'
}