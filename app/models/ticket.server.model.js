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

//removed semcologns from properties as they are not needed
var IncidentSchema = new Schema({
  //userId: { //added complexity to our controllers going to try username as our unique field instead
    //type: String,
    //trim: true
  //},

  //reference Id is a user friendly number that can be given to users
  //to reference their ticket in the ticket database or provide to the admin
  //working on their ticket to find their ticket
  referenceId: {
    type: String,
    unique: true
  },
  //holds the username of the client the ticket belongs to
  username: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },

  title: {
    type: String,
    trim: true
  },
  //storing priority as a number
  //for easy comparison
  priority: Number,
  //storing status as a number for
  //easy comparison
  status: String,
  //the overall impact of ticket on the userbase
  impact: Number,
  //how urgent the ticket is based on admin review
  urgency: Number,
  //a calculated value base on impact and urgency
  //that determine how import a ticket is
  severity: Number,
  //allows the user to state whether or not they believe that there problem is urgent
  //then an admin can decide how urgent the ticket really is
  isUrgent: Boolean,
  //narrative stored as nested document for
  //modularity

  //holds the date of creation for sorting
  createdAt: {
    type: Date,
    default: Date.now()
  },

  narrative: [
    {
      narrativeId: {
        type: String,
        trim: true
      },
      narrativeTitle: {
        type: String,
        trim: true
      },
      narrativeBody: {
        type: String,
        trim: true
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
