import mongoose from 'mongoose';
import { Router } from 'express';
import Account from '../models/account';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from '../config';

import { generateAccessToken, respond, authenticate } from '../middleware/authMiddleware';

export default ({ config, deb }) => {
  let api = Router();

  api.post('/register', (req, res) => {
    Account.register(new Account({ username: req.body.email}), req.body.password, (err, account) => {
      if (err) {
        res.send(err);
      }

      passport.authenticate(
        'local', {
          session: false
        })(req, res, () => {
          res.status(200).send('Successfully created new account!')
        })
    })
  })

  api.post('/login', passport.authenticate(
    'local', {
      session: false,
      scope: []
  }), generateAccessToken, respond);

  api.get('/login/facebook', passport.authenticate('facebook'));

  api.get('/login/facebook/callback', passport.authenticate('facebook', {
      successRedirect: '/v1/restaurant',
      failureRedirect: '/nope'
    }), generateAccessToken, respond);

  api.get('/logout', authenticate, (req, res) => {
    res.logout();
    res.status(200).send("Successfully logged out!")
  });

  api.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  api.get('/login/google/callback', passport.authenticate('google', {  
    successRedirect: '/v1/restaurant',
    failureRedirect: '/',
  }));

  api.get('/me', authenticate, (req, res) => {
    res.status(200).json(req.user);
  });

  return api;
}