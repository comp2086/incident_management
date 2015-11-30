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
  userId: {
    type: String,
    trim: true;
  },
  description: {
    type: String,
    trim: true;
  },
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
      narrativeId: {
        type: String,
        trim: true;
      },
      narrativeTitle: {
        type: String,
        trim: true;
      },
      narrativeBody: {
        type: String,
        trim: true;
      },
      narrativeCreatedAt: {
        type: Date,
        default: Date.now
      },
      narrativeUpdatedAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
},
{
  //specify the collection
  collection: 'incidents'
});

module.exports = mongoose.model('Incident', IncidentSchema);
