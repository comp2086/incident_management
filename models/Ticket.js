/**
 * Anthony Scinocco
 * incident-management.azurewebsites.net
 * November 23, 2015
 * Holds the Ticket schema
 */
//modules for schema
var mongoose = require('mongoose');

//build schema object
var Schema = mongoose.Schema;

var IncidentSchema = new Schema({
    userId: String,
    description: String,
    //storing priority as a number
    //for easy comparison
    priority: Number,
    //storing status as a number for
    //easy comparison
    status: Number,
    //narrative stored as nested document for
    //modularity
    narrative: [
        {
            narrativeId: String,
            narrativeTitle: String,
            narrativeBody: String,
            narrativeCreatedAt: String,
            narrativeUpdatedAt: String
        }
    ]
},{
    //specify the collection
    collection: 'incidents'
});

module.exports = mongoose.model('Incident', IncidentSchema);
