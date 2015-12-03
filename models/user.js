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
var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  username: {
    type: String,
    trim: true
  },
  password: String,
  //using a number to identify role
  //as it will be easy to check
  //if a user is 1 or 2
  //1 == client
  //2 == admin
  role: Number,
  salt: String,
	provider: String,
	providerId: String,
	providerData: {},
  created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Number,
		default: Date.now
	}
},
{
  collection: 'users'
});

//hash users password
UserSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, 8, null);
};

//validate password
UserSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

module.exports = mongoose.model('User', UserSchema);
