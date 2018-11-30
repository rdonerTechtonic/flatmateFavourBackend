const mongoose = require ('mongoose');

var RoommateSchema = new mongoose.Schema({
  roommateName: String,
  roommateEmail: String,
  roommatePassword: String,
  houseId: {type: mongoose.Schema.Types.ObjectId, ref: 'Household'},
});



mongoose.model('Roommate', RoommateSchema);

module.exports = mongoose.model('Roommate');
