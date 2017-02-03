import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let Fb = new Schema({
  email: String,
  password: String,
  facebookId: String,
  googleId: String,
  restaurants: [{type: Schema.Types.ObjectId, ref: 'Restaurant'}],
  //tips : [{type: Schema.Types.ObjectId, ref: 'Tips'}],
  //goal: Number
});

module.exports = mongoose.model('Fb', Fb)