/**
 * Anthony Scinocco
 * incident-management.azurewebsites.net
 * November 23, 2015
 * Holds the user schema
 * This is currently a rough outline of
 * a user model and will be changed in the
 * future
 */
//modules for schmea
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var UserSchema = Schema({
    username: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    //using a number to identify role
    //as it will be easy to check
    //if a user is 1 or 2
    //1 == client
    //2 == admin
    role: Number
},{
    //specify the collection
    collection: 'users'
});

//hash users password
UserSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSalt(8), null);
};

//validate password
UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
