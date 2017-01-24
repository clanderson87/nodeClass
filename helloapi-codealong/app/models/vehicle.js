//Import mongoose and pull out Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Define the VehicleSchema
var VehicleSchema = new Schema({
  make: String,
  model: String,
  color: String
});

//Export the Schema
module.exports = mongoose.model('Vehicle', VehicleSchema);