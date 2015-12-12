/**
* Anthony Scinocco
* incident-management.azurewebsites.net
* November 23, 2015
* Holds the Ticket schema
* Last Updated By : Dan (12/10/2015)
*/
//modules for schema
var mongoose = require('mongoose');
//build schema object
var Schema = mongoose.Schema;

//removed semcologns from properties as they are not needed
var IncidentSchema = new Schema({
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
    status: {
        type: String,
        trim: true,
        default: 'Open'
    },
    //storing priority as a number
    //for easy comparison
    priority: {
        type: Number,
        default: 1
    },
    //the overall impact of ticket on the userbase
    impact: {
        type: Number,
        default: 1
    },
    //how urgent the ticket is based on admin review
    urgency: {
        type: Number,
        default: 1
    },
    //a calculated value base on impact and urgency
    //that determine how import a ticket is
    severity: {
        type: Number,
        default: 1
    },
    //allows the user to state whether or not they believe that there problem is urgent
    //then an admin can decide how urgent the ticket really is
    isUrgent: {
        type: Boolean,
        default: false 
    },      
    //holds the date of creation for sorting
    createdAt: {
        type: Date,
        default: Date.now()
    },
    //narrative stored as nested document for
    //modularity
    narrative: {
        id: {
            type: String,
            trim: true
        },
        timeStamp: {
            type: Date,
            default: Date.now()
        },
        username: {
            type: String,
            trim: true
        },
        comment: {
            type: String,
            trim: true,
            default: 'DEFAULT'
        },
        //The body is used to concatenate each successive 
        //narrative update/comment. With each update, the
        //contents of the body go into a hidden input field
        //of our Update page. It protects us from losing our
        //previous data by temporarily storing it before
        //overwriting our timeStamp/username/comment. Then,
        //retrieve the hidden input and append the updated
        //timeStamp, username and comment - saving it as our
        //new body. Rinse and Repeat.
        body: {
            type: String,
            trim: true,
            default: ''
        }
    },
    resolution: {
        exists: {
            type: Boolean,
            default: false
        },
        body: {
            type: String,
            trim: true,
            default: ''    
        }        
    }
},
{
    //specify the collection
    collection: 'incidents'
});

module.exports = mongoose.model('Incident', IncidentSchema);
