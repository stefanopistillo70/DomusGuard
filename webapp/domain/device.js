
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema

var sensorSchema = new Schema({
    name: { type: String},
    description: { type: String},
    type:  { type: String}
});


var deviceSchema = new Schema({
  id: { type: String, required: true},
  name: { type: String},
  deviceType : { type: String, enum : ['RC','']},
  technology: { type: String, enum : ['433','NRF24'], required: true },
  sensors: [sensorSchema],
  insertDate: Date
});


deviceSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.insertDate = currentDate;
  next();
});

// the schema is useless so far
// we need to create a model using it
var Device = mongoose.model('Device', deviceSchema);

// make this available to our users in our Node applications
module.exports = Device;