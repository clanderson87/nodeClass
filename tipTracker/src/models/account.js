import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import passportLocalMongoose from 'passport-local-mongoose';

let Account = new Schema({
  email: String,
  password: String,
  facebookId: String,
  googleId: String,
  restaurants: [{type: Schema.Types.ObjectId, ref: 'Restaurant'}],
  //tips : [{type: Schema.Types.ObjectId, ref: 'Tips'}],
  //goal: Number
});

Account.plugin(passportLocalMongoose);
module.exports = mongoose.model('Account', Account)