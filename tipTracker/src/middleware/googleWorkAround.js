import express from 'express';
import passport from 'passport';

let googleWorkAround = (req, res, next) => {
  passport.authenticate('google', { scope: ['profile'] });
}

export default googleWorkAround;