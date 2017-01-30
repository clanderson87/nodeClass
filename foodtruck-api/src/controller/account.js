import mongoose from 'mongoose';
import { Router } from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import Account from '../model/Account';
import config from '../config';

import { generateAccessToken, respond, authenticate } from '../middleware/authmiddleware';

export default ({ config, db }) => {

  let api = Router();
    //routes go here

  return api
}