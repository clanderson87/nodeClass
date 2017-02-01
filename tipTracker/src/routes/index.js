import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDb from '../db';
import restaurant from '../controllers/restaurant';

let router = express();

initializeDb(db => {

  //internal middleware
  router.use(middleware({ config, db }));

  //api routes v1
  router.use('/restaurant', restaurant({ config, db }));
});

export default router;