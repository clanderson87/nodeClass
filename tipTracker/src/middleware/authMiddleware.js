import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import secret from '../secrets/localSecret';

const TOKENTIME = 60*60*24*30;

let authenticate = expressJwt({ secret });

let generateAccessToken = (req, res, next) => {
  req.token = req.token || req.user.access_token || {};
  req.token = jwt.sign({
    id: req.user.id || req.user.facebook.id,   
  }, secret, {
    expiresIn: TOKENTIME
  });
  console.log("In generateAccessToken, req.token is: ", req.token);
  next();
}

let respond = (req, res) => {
  res.status(200).json({
    user: req.user.facebook.name,
    token: req.token
  });
}

module.exports = {
  authenticate,
  generateAccessToken,
  respond
}