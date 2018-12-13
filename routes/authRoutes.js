const passport = require('passport');
const express = require('express');

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
  res.redirect('/surveys');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
