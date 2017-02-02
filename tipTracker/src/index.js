import express from 'express'; //API framework
import http from 'http'; //Server Creation.
import bodyParser from 'body-parser'; //Allows request parsing
import mongoose from 'mongoose'; //ORM for MongoDB
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

import config from './config';
import routes from './routes';

let app = express();

app.server = http.createServer(app);

//middleware
app.use(bodyParser.json({
  limit: config.bodyLimit
}))

//passport auth
app.use(passport.initialize());
let Account = require('./models/account');

passport.use(new LocalStrategy({ 
  usernameField: 'email',
  passwordField: 'password'
},
  Account.authenticate()
));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//api routes v1
app.use('/v1', routes); //master route for v1 of api
app.server.listen(config.port);
console.log(`Started on port ${app.server.address().port}`);

export default app;