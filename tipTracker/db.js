import mongoose from 'mongoose'; //MongoDB ORM
import config from './config'

export default callback => {
  let db = mongoose.connect(config.mongoURL);
  callback(db);
}