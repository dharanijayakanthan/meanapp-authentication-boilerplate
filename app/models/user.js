var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name:  String,
  sex: String,
  address: String
});


module.exports = mongoose.model('User', UserSchema);

//module.exports = mongoose.model('SchoolUser',SchoolUserSchema);
