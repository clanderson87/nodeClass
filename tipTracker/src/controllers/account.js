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

  api.get('/login/oauth/facebook', passport.authenticate('facebook', { session: false, scope: 'email' }));

  api.get('/login/facebook/callback', passport.authenticate('facebook', {
      session: false,
      failureRedirect: '/nope'
    }), generateAccessToken, respond);
    //   (req, res) => {
    //   console.log('After generateAccessToken, req.token is: ', req.token);
    //   res.redirect("http://localhost:3005/v1/account/profile?access_token=" + req.token);
    // });

  api.get('/logout', authenticate, (req, res) => {
    res.logout();
    res.status(200).send("Successfully logged out!")
  });

  api.get('/me', authenticate, (req, res) => {
    res.status(200).json(req.user);
  });

  api.get(
    '/profile',
    passport.authenticate('bearer', { session: false }),
    function(req, res) {
        console.log(req.user);
        res.send("LOGGED IN as " + req.user.facebook.name + " - <a href=\"/logout\">Log out</a>");
    }
  );

  return api;
}