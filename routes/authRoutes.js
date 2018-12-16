const passport = require('passport');
const express = require('express');

const keys = require('../config/keys');

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  }),
  (req, res) => {
    res.send({ auth: 'auth' });
  }
);

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect(`${keys.redirectDomain}/surveys`);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(`${keys.redirectDomain}/`);
});

module.exports = router;
