import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  foodtype: {
    type: String,
    required: true
  },
  geometry: {
    type: { type: String, default: "Point" },
    coordinates: [Number]
  },
  cost: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);