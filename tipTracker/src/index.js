//Main imports
import express from 'express'; //API framework
import http from 'http'; //Server Creation.
import bodyParser from 'body-parser'; //Allows request parsing
import mongoose from 'mongoose'; //ORM for MongoDB
import passport from 'passport';

//secrets
import PassportSecrets from './secrets';

//passport strategies
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

passport.use(new FacebookStrategy({
  clientID: PassportSecrets.Facebook.clientId,
  clientSecret: PassportSecrets.Facebook.clientSecret,
  callbackURL: "http://localhost:3005/v1/account/login/facebook/callback",
  profileFields: ['id', 'displayName', 'email'],
},
  (accessToken, refreshToken, profile, done) => {
    Account.findOne({'facebook.id': profile.id}, (err, user) => {
      if(err){
        return done(err);
      }
      if (user) {
        passport.serializeUser((user, done) => {
          done(null, user);
        });
        passport.deserializeUser((obj, done) => {
          done(null, obj);
        }); 
      } else {
        let newUser = new Account();
        newUser.email = "";
        newUser.facebook.id = profile.id;
        newUser.facebook.token = accessToken;
        newUser.facebook.name = profile.displayName;

        newUser.save(function(err){
          if(err){
            throw(err);
          }
          return done(null, newUser)
        })
      }
      passport.serializeUser((user, done) => {
        done(null, user);
      });
      passport.deserializeUser((obj, done) => {
        done(null, obj);
      });
    });
  }
));

//api routes v1
app.use('/v1', routes); //master route for v1 of api
app.server.listen(config.port);
console.log(`Started on port ${app.server.address().port}`);

export default app;