var mongoose = require('mongoose');

//Mongoose Schema
var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
